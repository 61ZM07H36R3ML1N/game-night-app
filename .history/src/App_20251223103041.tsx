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
  
}