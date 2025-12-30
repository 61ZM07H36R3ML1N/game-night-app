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
  getDocs
} from 'firebase/firestore';
import { MessageCircle, Send, LogOut, Swords, Calendar as CalendarIcon, Plus } from 'lucide-react';
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

const GameNightApp = () => {
  const [user, setUser] = useState<string>(() => localStorage.getItem('gn_user') || '');
  const [activeTab, setActiveTab] = useState('menu');
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

  // Juice State
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubDate = onSnapshot(doc(db, 'config', 'main'), (doc) => {
      if (doc.exists()) setGameDate(doc.data().nextSession || '');
    });

    const unsubMenu = onSnapshot(query(collection(db, 'menu'), orderBy('votes', 'desc')), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ 
        id: doc.id, ...doc.data(), votedBy: doc.data().votedBy || [] 
      } as MenuItem)));
    });

    const unsubGames = onSnapshot(query(collection(db, 'games'), orderBy('votes', 'desc')), (snapshot) => {
      setSuggestions(snapshot.docs.map(doc => ({ 
        id: doc.id, ...doc.data(), votedBy: doc.data().votedBy || [] 
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

  // --- ACTIONS ---

  // VALIDATION HELPER
  const isValidInput = (text: string) => {
    if (text.length > 40) {
      toast.error("Too long! Keep it under 40 chars.");
      return false;
    }
    // Check for links (http, https, www, .com)
    const linkRegex = /(http|https|www|\.com|\.net|\.org)/i;
    if (linkRegex.test(text)) {
      toast.error("No links allowed! 🛡️");
      return false;
    }
    return true;
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    if (!isValidInput(tempName)) return;

    localStorage.setItem('gn_user', tempName);
    setUser(tempName);
    toast.success(`Welcome, ${tempName}!`);
    
    addDoc(collection(db, 'messages'), {
      text: `${tempName} joined!`,
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

  // --- UPDATED VOTE LOGIC (MAX 3) ---
  const handleVote = async (collectionName: string, id: string, votedBy: string[] = []) => {
    const itemRef = doc(db, collectionName, id);
    const hasVoted = votedBy.includes(user);

    if (hasVoted) {
      // Remove Vote
      await updateDoc(itemRef, { votes: increment(-1), votedBy: arrayRemove(user) });
      toast('Vote removed', { icon: '↩️' });
    } else {
      // Check User's Current Vote Count
      const list = collectionName === 'menu' ? menuItems : suggestions;
      const myVotes = list.filter(i => i.votedBy?.includes(user)).length;

      if (myVotes >= 3) {
        return toast.error("You only have 3 votes! Uncheck something else first.");
      }

      // Add Vote
      try {
        const audio = new Audio('/pop_1.mp3');
        audio.volume = 0.5; 
        audio.play();
      } catch (e) { console.log("Audio error", e); }

      await updateDoc(itemRef, { votes: increment(1), votedBy: arrayUnion(user) });
      toast.success('Voted!');
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuItem.trim()) return;
    if (!isValidInput(newMenuItem)) return;

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

  const handleAddSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;
    if (!isValidInput(newSuggestion)) return;

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
    if (!isValidInput(newMessage)) return;

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
    const top3 = list.slice(0, 3).map(i => i.id); // Kept for logic reference
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
        const snapshot = await getDocs(q); // <--- Now uses the real tool
        
        // Delete them one by one
        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      };

      await Promise.all([
        clearCollection('menu'),
        clearCollection('games'),
        clearCollection('messages')
      ]);

      toast.success("💥 Board cleared!");
    } catch (error) {
      console.error("Reset Error:", error);
      toast.error("Reset failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="app-container">
        <Toaster position="top-center" />
        <div className="app-header">
          <h1>🎲 Game Night</h1>
          <p>Live Voting App</p>
        </div>
        <div className="login-screen">
          <div className="login-content">
            <span className="login-icon">👋</span>
            <h2>Welcome!</h2>
            <p className="login-hint">Who is joining the party?</p>
            <form onSubmit={handleJoin} className="login-form">
              <input 
                className="login-input"
                type="text" 
                placeholder="Enter your name..." 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
              />
              <button type="submit" className="join-btn">Join Party</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Toaster position="top-center" />
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} />}

      {/* Header */}
      <div className="app-header">
        <h1>🎲 Game Night</h1>
        
        <div className="date-picker-container" style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <CalendarIcon size={18} color="#fbbf24" />
          <input 
            type="date" 
            value={gameDate} 
            onChange={handleDateChange}
            style={{ 
              background: '#333', 
              border: '1px solid #555', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px' 
            }} 
          />
        </div>

        <div className="user-bar">
          <p>Hi, <strong>{user}</strong></p>
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <LogOut size={16} />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>🍕 Menu</button>
        <button className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>🎮 Games</button>
        <button className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>💬 Chat</button>
      </div>

      {/* Content */}
      <div className="content-area">
        {loading && <p className="loading">Loading data...</p>}

        {/* MENU VIEW */}
        {!loading && activeTab === 'menu' && (
          <div className="list-container">
            {/* STACKED FORM UI */}
            <form onSubmit={handleAddMenuItem} className="input-group">
              <input type="text" value={newMenuItem} onChange={(e) => setNewMenuItem(e.target.value)} placeholder="Suggest food..." />
              <div className="input-row">
                <select className="category-select" value={menuCategory} onChange={(e) => setMenuCategory(e.target.value)}>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                  <option value="Snack">Snack</option>
                </select>
                <button type="submit" className="add-btn">
                  <Plus size={18} /> Add
                </button>
              </div>
            </form>

            <div className="vote-counter">
              You have used <strong>{menuItems.filter(i => i.votedBy?.includes(user)).length} / 3</strong> votes.
            </div>

            {menuItems.map((item) => {
              const hasVoted = item.votedBy?.includes(user);
              return (
                <div key={item.id} className="card menu-card">
                  <div className="card-info">
                    <h3>{item.name}</h3>
                    <span className="badge">{item.category}</span>
                    <p>{item.description}</p>
                  </div>
                  <button 
                    className={`vote-btn ${hasVoted ? 'voted' : ''}`} 
                    onClick={() => handleVote('menu', item.id, item.votedBy)}
                  >
                    {hasVoted ? '✅' : '👍'} {item.votes}
                  </button>
                </div>
              );
            })}
            
            {menuItems.length > 3 && (
              <button className="runoff-btn" onClick={handleRunoff}>
                <Swords size={18} /> Runoff (Top 3)
              </button>
            )}
            
            {menuItems.length === 0 && <button onClick={seedMenu} className="seed-btn">Load Default Menu</button>}
          </div>
        )}

        {/* GAMES VIEW */}
        {!loading && activeTab === 'games' && (
          <div className="list-container">
            <form onSubmit={handleAddSuggestion} className="input-group">
              <input type="text" value={newSuggestion} onChange={(e) => setNewSuggestion(e.target.value)} placeholder="Suggest a game..." />
              <button type="submit" className="add-btn">
                <Plus size={18} /> Add
              </button>
            </form>

            <div className="vote-counter">
              You have used <strong>{suggestions.filter(i => i.votedBy?.includes(user)).length} / 3</strong> votes.
            </div>

            {suggestions.map((game) => {
              const hasVoted = game.votedBy?.includes(user);
              return (
                <div key={game.id} className="card game-card">
                  <div className="card-info">
                    <span className="game-title">{game.title}</span>
                    {game.suggestedBy && <p className="subtitle">By: {game.suggestedBy}</p>}
                  </div>
                  <button 
                    className={`vote-btn ${hasVoted ? 'voted' : ''}`} 
                    onClick={() => handleVote('games', game.id, game.votedBy)}
                  >
                    {hasVoted ? '✅' : '👍'} {game.votes}
                  </button>
                </div>
              );
            })}

            {suggestions.length > 3 && (
              <button className="runoff-btn" onClick={handleRunoff}>
                <Swords size={18} /> Runoff (Top 3)
              </button>
            )}
          </div>
        )}

        {/* CHAT VIEW */}
        {!loading && activeTab === 'chat' && (
          <>
            <div className="chat-container">
              {messages.length === 0 && (
                <div className="empty-chat">
                  <MessageCircle size={48} />
                  <p>No messages yet. Start the chat!</p>
                </div>
              )}
              
              {messages.map((msg) => {
                const isMe = msg.sender === user;
                const isSystem = msg.sender === 'System';
                
                if (isSystem) {
                  return (
                    <div key={msg.id} className="system-msg">
                      {msg.text}
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`message-bubble ${isMe ? 'message-mine' : 'message-other'}`}>
                    {!isMe && <span className="message-sender">{msg.sender}</span>}
                    {msg.text}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
              <button type="submit" className="send-btn"><Send size={20} /></button>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="admin-zone">
          <p>Admin Zone</p>
          <button onClick={handleResetNight} className="nuke-btn">
            💣 Reset Night
          </button>
        </div>

      </div>
    </div>
  );
};

export default GameNightApp;