import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp, 
  deleteDoc,
  arrayUnion,
  arrayRemove,
  increment,
  setDoc,
} from 'firebase/firestore';
import { MessageCircle, Send, LogOut, Swords } from 'lucide-react';
import Confetti from 'react-confetti';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

// --- TYPES ---
interface MenuItem {
  id: string;
  name: string;
  category: string;
  votes: number;
  votedBy: string[];
  description: string;
}

interface GameSuggestion {
  id: string;
  title: string;
  votes: number;
  votedBy: string[];
  suggestedBy: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  createdAt: any;
}

type Tab = 'menu' | 'games' | 'chat';

const GameNightApp = () => {
  // --- STATE ---
  const [user, setUser] = useState<string>(() => localStorage.getItem('gn_user') || '');
  const [activeTab, setActiveTab] = useState<Tab>('menu');
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [suggestions, setSuggestions] = useState<GameSuggestion[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gameDate, setGameDate] = useState('');
  
  // Input State
  const [tempName, setTempName] = useState('');
  const [newMenuItem, setNewMenuItem] = useState('');
  const [menuCategory, setMenuCategory] = useState('Food');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // UI State
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // --- EFFECTS ---

  useEffect(() => {
    const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);

    const unsubDate = onSnapshot(doc(db, 'config', 'main'), (doc) => {
      if (doc.exists()) {
        setGameDate(doc.data().nextSession || '');
      }
    });

    const unsubMenu = onSnapshot(query(collection(db, 'menu'), orderBy('votes', 'desc')), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        votedBy: doc.data().votedBy || [] 
      } as MenuItem)));
    });

    const unsubGames = onSnapshot(query(collection(db, 'games'), orderBy('votes', 'desc')), (snapshot) => {
      setSuggestions(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        votedBy: doc.data().votedBy || [] 
      } as GameSuggestion)));
    });

    const unsubChat = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'asc')), (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage)));
      setLoading(false);
    });

    return () => { unsubMenu(); unsubGames(); unsubChat(); unsubDate(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // --- HANDLERS ---

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    localStorage.setItem('gn_user', tempName);
    setUser(tempName);
    toast.success(`Welcome to the party, ${tempName}!`);
    
    addDoc(collection(db, 'messages'), {
      text: `${tempName} joined the party!`,
      sender: 'System',
      createdAt: serverTimestamp()
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('gn_user');
    setUser('');
    toast('See ya later!', { icon: '👋' });
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setGameDate(newDate);
    await setDoc(doc(db, 'config', 'main'), { nextSession: newDate }, { merge: true });
    toast.success('Date updated!');
  };

  const handleVote = async (collectionName: string, id: string, votedBy: string[] = []) => {
    const itemRef = doc(db, collectionName, id);
    const hasVoted = votedBy.includes(user);

    try {
      if (hasVoted) {
        await updateDoc(itemRef, {
          votes: increment(-1),
          votedBy: arrayRemove(user)
        });
        toast('Vote removed', { icon: '↩️' });
      } else {
        // Play Sound (Optional)
        try {
          const audio = new Audio('/pop_1.mp3');
          audio.volume = 0.5; 
          audio.play();
        } catch (e) { /* silent fail */ }

        await updateDoc(itemRef, {
          votes: increment(1),
          votedBy: arrayUnion(user)
        });
        toast.success('Voted!');
      }
    } catch (error) {
      console.error("Vote failed:", error);
      toast.error("Voting failed. Try again.");
    }
  };

  const handleAddMenuItem = async () => {
    if (!newMenuItem.trim()) return;
    await addDoc(collection(db, 'menu'), {
      name: newMenuItem,
      category: menuCategory,
      votes: 1,
      votedBy: [user],
      description: 'Added by ' + user,
      createdAt: serverTimestamp()
    });
    setNewMenuItem('');
    toast.success('Added to Menu!');
  };

  const handleAddSuggestion = async () => {
    if (!newSuggestion.trim()) return;
    await addDoc(collection(db, 'games'), {
      title: newSuggestion,
      votes: 1,
      votedBy: [user],
      suggestedBy: user,
      createdAt: serverTimestamp()
    });
    setNewSuggestion('');
    toast.success('Game suggested!');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      sender: user,
      createdAt: serverTimestamp()
    });
    setNewMessage('');
  };

  const handleRunoff = async () => {
    const list = activeTab === 'menu' ? menuItems : suggestions;
    if (list.length <= 3) return toast.error("Need more than 3 items for a runoff!");
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);

    const collectionName = activeTab === 'menu' ? 'menu' : 'games';
    const losers = list.slice(3);

    losers.forEach(async (item) => {
      await deleteDoc(doc(db, collectionName, item.id));
    });

    toast.success(`Runoff Complete! ${losers.length} items removed.`);
  };

  const seedMenu = async () => {
    const defaults = [
      { name: 'Pepperoni Pizza', category: 'Food', desc: 'Classic choice' },
      { name: 'Wings (Buffalo)', category: 'Food', desc: 'Spicy!' },
      { name: 'Mountain Dew', category: 'Drink', desc: 'Gamer fuel' },
    ];
    defaults.forEach(async (d) => {
      await addDoc(collection(db, 'menu'), {
        name: d.name,
        category: d.category,
        votes: 0,
        votedBy: [],
        description: d.desc,
        createdAt: serverTimestamp()
      });
    });
    toast.success("Default menu loaded");
  };

  const handleResetNight = async () => {
    if (!window.confirm("🚨 DANGER: Delete ALL data?")) return;
    
    setLoading(true);
    try {
      const clearCollection = async (name: string) => {
        const q = query(collection(db, name));
        const snapshot = await (await import('firebase/firestore')).getDocs(q);
        snapshot.forEach((doc) => deleteDoc(doc.ref));
      };

      await Promise.all([
        clearCollection('menu'),
        clearCollection('games'),
        clearCollection('messages')
      ]);

      toast.success("💥 Board cleared!");
    } catch (error) {
      toast.error("Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---

  // LOGIN VIEW (Glassy Login)
  if (!user) {
    return (
      <div className="app-layout">
        <Toaster position="top-center" />
        <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <header className="glass-header" style={{ width: '100%', borderRadius: '24px 24px 0 0' }}>
             <div className="title-row">
               <span style={{ fontSize: '2.5rem' }}>🎲</span>
               <h1>Game Night</h1>
             </div>
          </header>
          
          <div style={{ padding: '40px 20px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>Who's joining?</h2>
            <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                className="glass-input"
                type="text" 
                placeholder="Enter your name..." 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
              />
              <button type="submit" className="glass-btn-add" style={{ width: '100%' }}>
                Join Party
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP VIEW
  return (
    <div className="app-layout">
      <Toaster position="top-center" />
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} />}
      
      <div className="app-container">
        
        {/* 1. Header Section */}
        <header className="glass-header">
          <div className="title-row">
            <span style={{ fontSize: '2.5rem' }}>🎲</span>
            <h1>Game Night</h1>
          </div>
          <div className="date-wrapper">
             <input 
               type="date" 
               className="date-picker-styled"
               value={gameDate}
               onChange={handleDateChange}
             />
          </div>
        </header>

        {/* 2. User Bar */}
        <div className="user-bar">
          <span style={{ fontSize: '1.1rem' }}>Hi, <strong>{user}</strong></span>
          <button onClick={handleLogout} className="glass-btn-exit" style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: '#ccc', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px'
          }}>
            <LogOut size={16} /> Exit
          </button>
        </div>

        {/* 3. Navigation Tabs */}
        <nav className="nav-tabs">
          <button className={`tab ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>🍕 Menu</button>
          <button className={`tab ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>🎮 Games</button>
          <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>💬 Chat</button>
        </nav>

        {/* 4. Main Content Area */}
        <main className="content-area">
          {loading && <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>Loading...</p>}

          {/* MENU & GAMES INPUTS */}
          {!loading && activeTab !== 'chat' && (
            <div className="action-bar">
              <input
                type="text"
                className="glass-input"
                placeholder={activeTab === 'menu' ? "Suggest food..." : "Suggest a game..."}
                value={activeTab === 'menu' ? newMenuItem : newSuggestion}
                onChange={(e) => activeTab === 'menu' ? setNewMenuItem(e.target.value) : setNewSuggestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (activeTab === 'menu' ? handleAddMenuItem() : handleAddSuggestion())}
              />
              
              {activeTab === 'menu' && (
                <select 
                  className="glass-select"
                  value={menuCategory}
                  onChange={(e) => setMenuCategory(e.target.value)}
                >
                  <option value="Food">Food</option>
                  <option value="Snack">Snack</option>
                  <option value="Drink">Drink</option>
                </select>
              )}

              <button 
                onClick={activeTab === 'menu' ? handleAddMenuItem : handleAddSuggestion} 
                className="glass-btn-add"
              >
                +
              </button>
            </div>
          )}

          {/* LISTS (MENU / GAMES) */}
          <div className="list-container">
            
            {/* MENU LIST */}
            {!loading && activeTab === 'menu' && (
              <>
                {menuItems.length === 0 && (
                   <div className="empty-state">
                      <p>No snacks yet. Feed the gremlins!</p>
                      <button onClick={seedMenu} style={{ marginTop: '10px', background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Load Defaults</button>
                   </div>
                )}
                {menuItems.map((item) => {
                  const hasVoted = item.votedBy?.includes(user);
                  return (
                    <div key={item.id} className="glass-item">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.category} • {item.description}</div>
                      </div>
                      <button 
                        className={`vote-pill ${hasVoted ? 'voted' : ''}`} 
                        onClick={() => handleVote('menu', item.id, item.votedBy)}
                        style={{ 
                           background: hasVoted ? '#10b981' : 'rgba(255,255,255,0.1)', 
                           border: 'none',
                           color: 'white',
                           padding: '6px 12px',
                           borderRadius: '20px',
                           cursor: 'pointer',
                           fontWeight: 'bold',
                           minWidth: '60px'
                        }}
                      >
                         {hasVoted ? '✅' : '👍'} {item.votes}
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {/* GAMES LIST */}
            {!loading && activeTab === 'games' && (
              <>
                 {suggestions.length === 0 && <div className="empty-state"><p>No games suggested.</p></div>}
                 {suggestions.map((game) => {
                  const hasVoted = game.votedBy?.includes(user);
                  return (
                    <div key={game.id} className="glass-item">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{game.title}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Suggested by {game.suggestedBy}</div>
                      </div>
                      <button 
                        className={`vote-pill ${hasVoted ? 'voted' : ''}`} 
                        onClick={() => handleVote('games', game.id, game.votedBy)}
                        style={{ 
                           background: hasVoted ? '#10b981' : 'rgba(255,255,255,0.1)', 
                           border: 'none',
                           color: 'white',
                           padding: '6px 12px',
                           borderRadius: '20px',
                           cursor: 'pointer',
                           fontWeight: 'bold',
                           minWidth: '60px'
                        }}
                      >
                         {hasVoted ? '✅' : '👍'} {game.votes}
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {/* CHAT LIST */}
            {!loading && activeTab === 'chat' && (
              <div className="chat-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '10px' }}>
                   {messages.length === 0 && (
                      <div className="empty-state">
                        <MessageCircle size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                        <p>Start the chat!</p>
                      </div>
                   )}
                   {messages.map((msg) => {
                      const isMe = msg.sender === user;
                      const isSystem = msg.sender === 'System';
                      if (isSystem) return <div key={msg.id} style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.6, margin: '10px 0' }}>{msg.text}</div>;
                      
                      return (
                        <div key={msg.id} style={{ 
                           display: 'flex', 
                           justifyContent: isMe ? 'flex-end' : 'flex-start', 
                           marginBottom: '8px' 
                        }}>
                           <div style={{ 
                              background: isMe ? '#7c3aed' : 'rgba(255,255,255,0.1)', 
                              padding: '8px 12px', 
                              borderRadius: '12px', 
                              borderBottomRightRadius: isMe ? '2px' : '12px',
                              borderBottomLeftRadius: isMe ? '12px' : '2px',
                              maxWidth: '75%'
                           }}>
                              {!isMe && <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '2px' }}>{msg.sender}</div>}
                              <div>{msg.text}</div>
                           </div>
                        </div>
                      );
                   })}
                   <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="action-bar" style={{ padding: '10px 0 0 0' }}>
                   <input type="text" className="glass-input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type message..." />
                   <button type="submit" className="glass-btn-add"><Send size={18} /></button>
                </form>
              </div>
            )}
            
            {/* Runoff Button (Only show if needed) */}
            {!loading && activeTab !== 'chat' && (activeTab === 'menu' ? menuItems.length : suggestions.length) > 3 && (
               <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button onClick={handleRunoff} className="glass-btn-exit" style={{ 
                      background: 'rgba(251, 191, 36, 0.2)', 
                      color: '#fbbf24', 
                      border: '1px solid rgba(251, 191, 36, 0.5)' 
                  }}>
                    <Swords size={16} style={{ marginRight: '5px' }} /> Runoff Vote (Top 3)
                  </button>
               </div>
            )}

          </div>
        </main>

        {/* 5. Admin Footer */}
        <footer className="admin-footer">
           <button onClick={handleResetNight} className="btn-danger-ghost">
             💣 Reset Night
           </button>
           <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.3 }}>v1.2 (Glass)</div>
        </footer>

      </div>
    </div>
  );
};

export default GameNightApp;