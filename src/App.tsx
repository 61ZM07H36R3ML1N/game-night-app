import React, { useState } from 'react';
import { Plus, ThumbsUp, Pizza, Gamepad2, Utensils } from 'lucide-react';

// Mock Data for the Host's Menu
const INITIAL_MENU = [
  { id: 1, name: 'Loaded Nachos', category: 'Appetizers', description: 'Jalapenos, beef, and queso' },
  { id: 2, name: 'Smash Burgers', category: 'Main', description: 'Double patty with house sauce',},
  { id: 3, name:  'Beverages', category: 'Drinks', description: 'Water, Pop, Energy drinks' }
];

// Mock Data for Initial Game Suggestions
const INTIAL_GAMES = [
  { id: 1, name: 'Catan', category: 'Strategy', description: 'Resource management game' },
  { id: 2, name: 'Fluxx', category: 'Party', description: 'Card game with changing rules' },
  { id: 3, name: 'Doomlings', category: 'Party', description: 'Card game with a variety of strategies'},
  { id: 4, name: 'Magic The Gathering', category: 'Collectible', description: 'Card game with a variety of strategies'},
  { id: 5, name: 'Ascension', category: 'Deck Building', description: 'Card game with a variety of strategies' }
];

const GameNightApp = () => {
  const [activeTab, setActiveTab] = useState('menu') // default to menu or games
  const [menuItems] = useState(INITIAL_MENU);
  const [suggestions, setSuggestions] = useState(INTIAL_GAMES);
  const [newSuggestion, setNewSuggestion] = useState('');
}

// function to handle voting
  const handleVote = (id) => {
    const updatedSuggestions = suggestions.map(game => 
      game.id === id ? { ...game, votes: game.votes + 1 } : game
    );
    // Sort by votes descending
    setSuggestions(updatedSuggestions.sort((a, b) => b.votes - a.votes));
  };

  // function to add a new game suggestion 
   const handleAddSuggetion = (e) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;

    const newGame = {
      id: Date.now(),
      name: newSuggestion,
      votes: 1
    };

    setSuggestions([...suggestions, newGame]);
    setNewSuggestion('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">

    {/* Header */}
    <div className="bg-indigo-600 p-6 text-center">
      <h1 className="text-2xl font-bold text-white tracking-wider uppercase">Game Night Hub</h1>
      <p className="text-indigo-200 text-sm mt-1">Friday Night @ The Den</p>
    </div>

    {/* Navigation Tabs */}
    <div className="flex border-b border-slate-700">
      <button
      onClick={() => setActiveTab('menu')}
      className={`flex-1 p-4 text-center font-medium transition-colors flex justify-center items-center gap-2
        ${activeTab === 'menu' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'}`}
      >
        <Utensils size={18} /> On The Menu
      </button>
      <button
        onClick={() => setActiveTab('games')}
        className={`flex-1 py-4 text-center font-medium transition-colors flex justify-center items-center gap-2
          ${activeTab === 'games' ? 'bg-slate-700 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'}`}
      >
        <Gamepad2 size={18} /> Game Voting
      </button>
    </div>

    {/* Content Area */}
    <div className="p-6 min-h-[400px]">

      {/* Menu View */}
      
    </div>
        
    </div>
      </div>
    </div>
  )

}
