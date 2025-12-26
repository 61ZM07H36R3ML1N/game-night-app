import React, { useState, useEffect } from 'react';
import './App.css'; 
import { db } from './firebase'; 
import { collection, onSnapshot, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Plus, LogOut } from 'lucide-react';

// Default data
const SEED_MENU = [
  { name: 'Loaded Nachos', category: 'Food', description: 'Jalapenos, beef, and queso', votes: 0 },
  { name: 'Smash Burgers', category: 'Food', description: 'Double patty with house sauce', votes: 0 },
  { name: 'Craft Sodas', category: 'Drink', description: 'Root beer, Cream soda, Orange', votes: 0 }
];

const GameNightApp = () => {
  // --- STATE ---
  const [user, setUser] = useState<string>(''); // OPTION 2: Identity State
  const [tempName, setTempName] = useState('');
  
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Inputs
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newMenuItem, setNewMenuItem] = useState(''); // OPTION 3: Menu Input
  const [menuCategory, setMenuCategory] = useState('Food');

  // --- 1. SETUP & LISTENERS ---
  useEffect(() => {
    // Check if user is already logged in (saved in phone storage)
    const savedName = localStorage.getItem('gameNightUser');
    if (savedName) setUser(savedName);

    // Menu Listener
    const menuQuery = query(collection(db, 'menu'), orderBy('votes', 'desc'));
    const unsubscribeMenu = onSnapshot(menuQuery, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuData);
    });

    // Games Listener
    const gamesQuery = query(collection(db, 'games'), orderBy('votes', 'desc'));
    const unsubscribeGames = onSnapshot(gamesQuery, (snapshot) => {
      const gameData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSuggestions(gameData);
      setLoading(false);
    });

    return () => {
      unsubscribeMenu();
      unsubscribeGames();
    };
  }, []);

  // --- 2. ACTIONS ---
  
  // Login Action
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    localStorage.setItem('gameNightUser', tempName); // Save to phone
    setUser(tempName);
  };

  // Logout Action
  const handleLogout = () => {
    localStorage.removeItem('gameNightUser'); // Wipe from phone memory
    setUser(''); // Reset state to trigger Login Screen
  };

  // Vote Action

  const handleVote = async (collectionName: string, id: string, currentVotes: number) => {
    // We could eventually check if this user already voted here!
    console.log(`${user} voted in ${collectionName}`); 
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, { votes: currentVotes + 1 });
  };

  // Add Game (Option 3 Logic)
  const handleAddSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;
    await addDoc(collection(db, 'games'), {
      title: newSuggestion,
      votes: 1,
      suggestedBy: user, // Tag the user!
      createdAt: Date.now()
    });
    setNewSuggestion('');
  };

  // Add Menu Item (Option 3 Logic)
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

  const seedMenu = async () => {
    SEED_MENU.forEach(async (item) => {
      await addDoc(collection(db, 'menu'), item);
    });
  };

  // --- 3. RENDER ---

  // OPTION 2: If no user, show Login Screen with Header
  if (!user) {
    return (
      <div className="app-container">
        
        {/* 1. Header is BACK now */}
        <div className="app-header">
          <h1>🎲 Game Night</h1>
          <p>Live Voting App</p>
        </div>

        {/* 2. Login Form (Centered in remaining space) */}
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

  // If user exists, show Main App
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
      </div>

      {/* Content */}
      <div className="content-area">
        {loading && <p className="loading">Loading data...</p>}

        {/* MENU VIEW (Updated for Option 3) */}
        {!loading && activeTab === 'menu' && (
          <div className="list-container">
            {/* NEW MENU FORM */}
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
      </div>
    </div>
  );
};

export default GameNightApp;