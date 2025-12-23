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

      </div>
    </div>
  )

}
