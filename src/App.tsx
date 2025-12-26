import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import { db } from './firebase'; 
import { collection, onSnapshot, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { LogOut, MessageCircle, Send } from 'lucide-react';

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

  // Auto-scroll ref for chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 1. SETUP & LISTENERS ---
  useEffect(() => {
    // Check local storage for identity
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

    // C. Chat Listener (New!)
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

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  // --- 2. ACTIONS ---
  
  // Login / Logout
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

  // Voting
  const handleVote = async (collectionName: string, id: string, currentVotes: number) => {
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, { votes: currentVotes + 1 });
  };

  // Add Game
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

  // Add Menu Item
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

  // Send Message (New!)
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

  // Seed Data
  const seedMenu = async () => {
    SEED_MENU.forEach(async (item) => {
      await addDoc(collection(db, 'menu'), item);
    });
  };

  // --- 3. RENDER ---

  // LOGIN SCREEN
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

  // MAIN APP
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

      {/* Navigation Tabs */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} 
          onClick={() => setActiveTab('menu')}
        >
          🍕 Menu
        </button>
        <button 
          className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`} 
          onClick={() => setActiveTab('games')}
        >
          🎮 Games
        </button>
        <button 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
      </div>

      {/* Main Content */}
      <div className="content-area">
        {loading && <p className="loading">Loading data...</p>}

        {/* MENU VIEW */}
        {!loading && activeTab === 'menu' && (
          <div className="list-container">
            <form onSubmit={handleAddMenuItem} className="input-group">
              <input 
                type="text" 
                value={newMenuItem}
                onChange={(e) => setNewMenuItem(e.target.value)}
                placeholder="Suggest food..."
              />
              <select 
                className="category-select"
                value={menuCategory}
                onChange={(e) => setMenuCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Drink">Drink</option>
                <option value="Snack">Snack</option>
              </select>
              <button type="submit">+</button>
            </form>

            {menuItems.length === 0 ? (
              <button onClick={seedMenu} className="seed-btn">Load Default Menu</button>
            ) : (
              menuItems.map((item) => (
                <div key={item.id} className="card menu-card">
                  <div className="card-info">
                    <h3>{item.name}</h3>
                    <span className="badge">{item.category}</span>
                    <p>{item.description}</p>
                  </div>
                  <button 
                    className="vote-btn"
                    onClick={() => handleVote('menu', item.id, item.votes)}
                  >
                    👍 {item.votes}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* GAMES VIEW */}
        {!loading && activeTab === 'games' && (
          <div className="list-container">
            <form onSubmit={handleAddSuggestion} className="input-group">
              <input 
                type="text" 
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                placeholder="Suggest a game..."
              />
              <button type="submit">+</button>
            </form>

            {suggestions.map((game) => (
              <div key={game.id} className="card game-card">
                <div className="card-info">
                  <span className="game-title" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{game.title}</span>
                  {game.suggestedBy && (
                    <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>By: {game.suggestedBy}</p>
                  )}
                </div>
                <button 
                  className="vote-btn"
                  onClick={() => handleVote('games', game.id, game.votes)}
                >
                  👍 {game.votes}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CHAT VIEW (NEW) */}
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
                return (
                  <div key={msg.id} className={`message-bubble ${isMe ? 'message-mine' : 'message-other'}`}>
                    {!isMe && <span className="message-sender">{msg.sender}</span>}
                    {msg.text}
                  </div>
                );
              })}
              {/* Invisible element to trigger auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
              <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..." 
              />
              <button type="submit" className="send-btn">
                <Send size={20} />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default GameNightApp;