import React, { useState, useEffect } from 'react';
import './App.css'; // This connects your styles!
import { db } from './firebase'; 
import { collection, onSnapshot, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

// Default data
const SEED_MENU = [
  { name: 'Loaded Nachos', category: 'Appetizer', description: 'Jalapenos, beef, and queso', votes: 0 },
  { name: 'Smash Burgers', category: 'Main', description: 'Double patty with house sauce', votes: 0 },
  { name: 'Craft Sodas', category: 'Drink', description: 'Root beer, Cream soda, Orange', votes: 0 }
];

const GameNightApp = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [loading, setLoading] = useState(true);

  // --- 1. DB LISTENERS ---
  useEffect(() => {
    const menuQuery = query(collection(db, 'menu'), orderBy('votes', 'desc'));
    const unsubscribeMenu = onSnapshot(menuQuery, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuData);
    });

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
      createdAt: Date.now()
    });
    setNewSuggestion('');
  };

  const seedMenu = async () => {
    SEED_MENU.forEach(async (item) => {
      await addDoc(collection(db, 'menu'), item);
    });
  };

  // --- 3. THE RENDER ---
  return (
    <div className="app-container">
      
      {/* Header Section */}
      <div className="app-header">
        <h1>🎲 Game Night</h1>
        <p>Live Voting App</p>
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
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        {loading && <p className="loading">Loading data...</p>}

        {/* MENU VIEW */}
        {!loading && activeTab === 'menu' && (
          <div className="list-container">
            {menuItems.length === 0 ? (
              <button onClick={seedMenu} className="seed-btn">Load Default Menu</button>
            ) : (
              menuItems.map((item: any) => (
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
              <button type="submit">Add</button>
            </form>

            {suggestions.map((game: any) => (
              <div key={game.id} className="card game-card">
                <span className="game-title">{game.title}</span>
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