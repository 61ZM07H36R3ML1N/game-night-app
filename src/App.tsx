import React, { useState } from 'react';
import { Plus, ThumbsUp, Pizza, Gamepad2, Utensils, Flame } from 'lucide-react';

// Mock Data for the Host's Menu - NOW WITH VOTES
const INITIAL_MENU = [
  { id: 1, name: 'Loaded Nachos', category: 'Appetizer', description: 'Jalapenos, beef, and queso', votes: 2 },
  { id: 2, name: 'Smash Burgers', category: 'Main', description: 'Double patty with house sauce', votes: 5 },
  { id: 3, name: 'Craft Sodas', category: 'Drink', description: 'Root beer, Cream soda, Orange', votes: 1 }
];

// Mock Data for Game Suggestions
const INITIAL_GAMES = [
  { id: 1, title: 'Catan', votes: 3 },
  { id: 2, title: 'Mario Kart', votes: 8 },
  { id: 3, title: 'Jackbox Party Pack', votes: 4 }
];

const GameNightApp = () => {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'games'
  
  // State for Menu
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  
  // State for Games
  const [suggestions, setSuggestions] = useState(INITIAL_GAMES);
  const [newSuggestion, setNewSuggestion] = useState('');

  // --- HANDLERS ---

  // Handle voting for FOOD
  const handleMenuVote = (id) => {
    const updatedMenu = menuItems.map(item => 
      item.id === id ? { ...item, votes: item.votes + 1 } : item
    );
    // Sort by votes descending
    setMenuItems(updatedMenu.sort((a, b) => b.votes - a.votes));
  };

  // Handle voting for GAMES
  const handleVote = (id) => {
    const updatedSuggestions = suggestions.map(game => 
      game.id === id ? { ...game, votes: game.votes + 1 } : game
    );
    // Sort by votes descending
    setSuggestions(updatedSuggestions.sort((a, b) => b.votes - a.votes));
  };

  // Handle adding a new game suggestion
  const handleAddSuggestion = (e) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;

    const newGame = {
      id: Date.now(),
      title: newSuggestion,
      votes: 1
    };

    setSuggestions([...suggestions, newGame]);
    setNewSuggestion('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center shadow-lg relative z-10">
          <h1 className="text-2xl font-bold text-white tracking-wider uppercase flex items-center justify-center gap-2">
            <Flame size={24} className="text-orange-300" /> Game Night
          </h1>
          <p className="text-indigo-200 text-sm mt-1">Vote for the vibes.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-800">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-4 text-center font-medium transition-all flex justify-center items-center gap-2
              ${activeTab === 'menu' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Utensils size={18} /> Menu
          </button>
          <button 
            onClick={() => setActiveTab('games')}
            className={`flex-1 py-4 text-center font-medium transition-all flex justify-center items-center gap-2
              ${activeTab === 'games' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Gamepad2 size={18} /> Games
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 min-h-[500px] bg-slate-800/50">
          
          {/* MENU VIEW */}
          {activeTab === 'menu' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="text-slate-400 text-sm text-center italic mb-4">
                What are we craving tonight?
              </p>
              {menuItems.map((item) => (
                <div key={item.id} className="bg-slate-750 border border-slate-700 p-4 rounded-lg flex items-center justify-between gap-3 shadow-md">
                  
                  {/* Icon & Text */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-slate-700 p-3 rounded-full text-indigo-400 shrink-0">
                      <Pizza size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-200 leading-tight">{item.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold border border-slate-600 px-1 rounded">{item.category}</span>
                      <p className="text-slate-400 text-sm mt-1 leading-snug">{item.description}</p>
                    </div>
                  </div>

                  {/* Vote Button */}
                  <button 
                    onClick={() => handleMenuVote(item.id)}
                    className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-600 border border-slate-600 w-14 h-14 rounded-lg transition-all group shrink-0"
                  >
                    <ThumbsUp size={18} className="text-slate-400 group-hover:text-green-400 transition-colors mb-1" />
                    <span className="font-bold text-slate-200 text-sm">{item.votes}</span>
                  </button>

                </div>
              ))}
            </div>
          )}

          {/* GAME VOTING VIEW */}
          {activeTab === 'games' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Add New Suggestion */}
              <form onSubmit={handleAddSuggestion} className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={newSuggestion}
                  onChange={(e) => setNewSuggestion(e.target.value)}
                  placeholder="Suggest a game..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg transition-colors shadow-lg">
                  <Plus size={24} />
                </button>
              </form>

              {/* Suggestions List */}
              <div className="space-y-3">
                {suggestions.map((game, index) => (
                  <div key={game.id} className="flex items-center justify-between bg-slate-700 p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 relative overflow-hidden">
                    {/* Rank Number (Visual Flair) */}
                    <span className="absolute -left-2 -top-2 text-6xl font-bold text-slate-600/20 pointer-events-none select-none">
                      {index + 1}
                    </span>
                    
                    <span className="font-medium text-lg relative z-10 pl-2">{game.title}</span>
                    
                    <button 
                      onClick={() => handleVote(game.id)}
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