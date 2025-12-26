import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import { db } from './firebase'; 
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { LogOut, MessageCircle, Send, Swords } from 'lucide-react';

// Default data
const SEED_MENU = [
  { name: 'Loaded Nachos', category: 'Food', description: 'Jalapenos, beef, and queso', votes: 0 },
  { name: 'Smash Burgers', category: 'Food', description: 'Double patty with house sauce', votes: 0 },
  { name: 'Craft Sodas', category: 'Drink', description: 'Root beer, Cream soda, Orange', votes: 0 }
];

const GameNightApp = () => {
  // --- STATE ---
  const [user, setUser] = useState<string>(''); 
  const [tempName, setTempName] = useState('');
  
  const [activeTab, setActiveTab] = useState('menu');
  const [loading, setLoading] = useState(true);

  // Data Collections
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Inputs
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newMenuItem, setNewMenuItem] = useState(''); 
  const [menuCategory, setMenuCategory] = useState('Food');
  const [newMessage, setNewMessage] = useState('');

  // Auto-scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 1. SETUP & LISTENERS ---
  useEffect(() => {
    const savedName = localStorage.getItem('gameNightUser');
    if (savedName) setUser(savedName);

    // A. Menu Listener
    const menuQuery = query(collection(db, 'menu'), orderBy('votes', 'desc'));
    const unsubscribeMenu = onSnapshot(menuQuery, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuData);
    });

    // B. Games Listener
    const gamesQuery = query(collection(db, 'games'), orderBy('votes', 'desc'));
    const unsubscribeGames = onSnapshot(gamesQuery, (snapshot) => {
      const gameData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSuggestions(gameData);
      setLoading(false);
    });

    // C. Chat Listener
    const chatQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribeChat = onSnapshot(chatQuery, (snapshot) => {
      const msgData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgData);
    });

    return () => {
      unsubscribeMenu();
      unsubscribeGames();
      unsubscribeChat();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  // --- 2. ACTIONS ---
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    localStorage.setItem('gameNightUser', tempName); 
    setUser(tempName);
  };

  const handleLogout = () => {
    localStorage.removeItem('gameNightUser'); 
    setUser(''); 
  };

  const handleVote = async (collectionName: string, id: string, currentVotes: number) => {
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, { votes: currentVotes + 1 });
  };

  const handleAddSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;
    await addDoc(collection(db, 'games'), {
      title: newSuggestion,
      votes: 1,
      suggestedBy: user,
      createdAt: Date.now()
    });
    setNewSuggestion('');
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuItem.trim()) return;
    await addDoc(collection(db, 'menu'), {
      name: newMenuItem,
      category: menuCategory,
      description: `Suggested by ${user}`,
      votes: 1,
      createdAt: Date.now()
    });
    setNewMenuItem('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      sender: user,
      createdAt: Date.now()
    });
    setNewMessage('');
  };

  const seedMenu = async () => {
    SEED_MENU.forEach(async (item) => {
      await addDoc(collection(db, 'menu'), item);
    });
  };

  // --- NEW: THE RUNOFF FUNCTION ---
  const handleRunoff = async () => {
    // 1. Identify which list we are looking at
    const collectionName = activeTab; // 'menu' or 'games'
    if (collectionName === 'chat') return;

    if (!window.confirm("⚠️ Are you sure? This will DELETE all items except the Top 3 and reset votes to 0.")) return;

    // 2. Get all items sorted by votes
    const q = query(collection(db, collectionName), orderBy('votes', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    if (docs.length <= 3) {
      alert("Need more than 3 items to run a runoff!");
      return;
    }

    // 3. Pick the winners (Top 3)
    const top3Ids = docs.slice(0, 3).map(d => d.id);

    // 4. Execute the Purge
    docs.forEach(async (item) => {
      if (top3Ids.includes(item.id)) {
        // Winner: Keep it, but reset votes
        await updateDoc(doc(db, collectionName, item.id), { votes: 0 });
      } else {
        // Loser: Delete it
        await deleteDoc(doc(db, collectionName, item.id));
      }
    });

    // 5. Announce it in chat automatically (Optional Polish)
    await addDoc(collection(db, 'messages'), {
      text: `⚔️ A Runoff has started for ${collectionName.toUpperCase()}! Only the Top 3 remain. Vote again!`,
      sender: "System",
      createdAt: Date.now()
    });
  };

  // --- 3. RENDER ---

  if (!user) {
    return (
      <div className="app-container">
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
      
      {/* Header */}
      <div className="app-header">
        <h1>🎲 Game Night</h1>
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
            <form onSubmit={handleAddMenuItem} className="input-group">
              <input type="text" value={newMenuItem} onChange={(e) => setNewMenuItem(e.target.value)} placeholder="Suggest food..." />
              <select className="category-select" value={menuCategory} onChange={(e) => setMenuCategory(e.target.value)}>
                <option value="Food">Food</option>
                <option value="Drink">Drink</option>
                <option value="Snack">Snack</option>
              </select>
              <button type="submit">+</button>
            </form>

            {menuItems.map((item) => (
              <div key={item.id} className="card menu-card">
                <div className="card-info">
                  <h3>{item.name}</h3>
                  <span className="badge">{item.category}</span>
                  <p>{item.description}</p>
                </div>
                <button className="vote-btn" onClick={() => handleVote('menu', item.id, item.votes)}>
                  👍 {item.votes}
                </button>
              </div>
            ))}
            
            {/* Runoff Button (Only shows if there are more than 3 items) */}
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
              <button type="submit">+</button>
            </form>

            {suggestions.map((game) => (
              <div key={game.id} className="card game-card">
                <div className="card-info">
                  <span className="game-title" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{game.title}</span>
                  {game.suggestedBy && <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>By: {game.suggestedBy}</p>}
                </div>
                <button className="vote-btn" onClick={() => handleVote('games', game.id, game.votes)}>
                  👍 {game.votes}
                </button>
              </div>
            ))}

            {/* Runoff Button (Only shows if there are more than 3 items) */}
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
                <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '50px' }}>
                  <MessageCircle size={48} style={{ margin: '0 auto 10px', display: 'block' }} />
                  <p>No messages yet. Start the chat!</p>
                </div>
              )}
              
              {messages.map((msg) => {
                const isMe = msg.sender === user;
                // Special style for System messages
                const isSystem = msg.sender === 'System';
                
                if (isSystem) {
                  return (
                    <div key={msg.id} style={{ textAlign: 'center', margin: '15px 0', opacity: 0.8, fontSize: '0.85rem', color: '#fbbf24' }}>
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
      </div>
    </div>
  );
};

export default GameNightApp;