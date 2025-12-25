import React, { useState, useEffect } from 'react';
import { Plus, ThumbsUp, Pizza, Gamepad2, Utensils, Flame, Loader2 } from 'lucide-react';
import { db } from './firebase'; // Import the connection we made
import { collection, onSnapshot, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

// Default data to load if the DB is empty
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

  // --- 1. LISTEN TO DATABASE (Real-time Sync) ---
  useEffect(() => {
    // Listen to 'menu' collection
    const menuQuery = query(collection(db, 'menu'), orderBy('votes', 'desc'));
    const unsubscribeMenu = onSnapshot(menuQuery, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuData);
    });

    // Listen to 'games' collection
    const gamesQuery = query(collection(db, 'games'), orderBy('votes', 'desc'));
    const unsubscribeGames = onSnapshot(gamesQuery, (snapshot) => {
      const gameData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSuggestions(gameData);
      setLoading(false);
    });

    // Cleanup listeners when app closes
    return () => {
      unsubscribeMenu();
      unsubscribeGames();
    };
  }, []);

  // --- 2. WRITING TO DATABASE ---

  // Handle Vote (Works for both Menu and Games)
  const handleVote = async (collectionName, id, currentVotes) => {
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, {
      votes: currentVotes + 1
    });
  };

  // Add New Game
  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;

    await addDoc(collection(db, 'games'), {
      title: newSuggestion,
      votes: 1,
      createdAt: Date.now() // specific for sorting if needed later
    });

    setNewSuggestion('');
  };

  // One-time Setup: Load default menu if empty
  const seedMenu = async () => {
    SEED_MENU.forEach(async (item) => {
      await addDoc(collection(db, 'menu'), item);
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        <div className="bg-indigo-600 p-6 text-center shadow-lg relative z-10">
          <h1 className="text-2xl font-bold text-white tracking-wider uppercase flex items-center justify-center gap-2">
            <Flame size={24} className="text-orange-300" /> Game Night
          </h1>
          <p className="text-indigo-200 text-sm mt-1">Live Voting App</p>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-slate-700 bg-slate-800">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-4 text-center font-medium flex justify-center items-center gap-2 ${activeTab === 'menu' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400'}`}
          >
            <Utensils size={18} /> Menu
          </button>
          <button 
            onClick={() => setActiveTab('games')}
            className={`flex-1 py-4 text-center font-medium flex justify-center items-center gap-2 ${activeTab === 'games' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400'}`}
          >
            <Gamepad2 size={18} /> Games
          </button>
        </div>

        <div className="p-6 min-h-[500px] bg-slate-800/50">
          
          {loading && (
             <div className="flex justify-center items-center h-40 text-indigo-400">
               <Loader2 className="animate-spin" size={32} />
             </div>
          )}

          {/* MENU TAB */}
          {!loading && activeTab === 'menu' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {menuItems.length === 0 ? (
                <button onClick={seedMenu} className="w-full py-4 border-2 border-dashed border-slate-600 text-slate-400 rounded-lg hover:border-indigo-500 hover:text-indigo-400 transition-colors">
                  Initialize Default Menu
                </button>
              ) : (
                menuItems.map((item) => (
                  <div key={item.id} className="bg-slate-750 border border-slate-700 p-4 rounded-lg flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-slate-700 p-3 rounded-full text-indigo-400 shrink-0">
                        <Pizza size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-200">{item.name}</h3>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold border border-slate-600 px-1 rounded">{item.category}</span>
                        <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleVote('menu', item.id, item.votes)}
                      className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-600 border border-slate-600 w-14 h-14 rounded-lg transition-all group shrink-0"
                    >
                      <ThumbsUp size={18} className="text-slate-400 group-hover:text-green-400 transition-colors mb-1" />
                      <span className="font-bold text-slate-200 text-sm">{item.votes}</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* GAMES TAB */}
          {!loading && activeTab === 'games' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <form onSubmit={handleAddSuggestion} className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={newSuggestion}
                  onChange={(e) => setNewSuggestion(e.target.value)}
                  placeholder="Suggest a game..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg shadow-lg">
                  <Plus size={24} />
                </button>
              </form>

              <div className="space-y-3">
                {suggestions.map((game, index) => (
                  <div key={game.id} className="flex items-center justify-between bg-slate-700 p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 relative overflow-hidden">
                    <span className="absolute -left-2 -top-2 text-6xl font-bold text-slate-600/20 pointer-events-none select-none">
                      {index + 1}
                    </span>
                    <span className="font-medium text-lg relative z-10 pl-2">{game.title}</span>
                    <button 
                      onClick={() => handleVote('games', game.id, game.votes)}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-all group z-10 border border-slate-600/50"
                    >
                      <ThumbsUp size={16} className="group-hover:text-green-400 transition-colors" />
                      <span className="font-bold text-slate-300">{game.votes}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GameNightApp;