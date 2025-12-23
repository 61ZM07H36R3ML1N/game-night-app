import React, { useState } from 'react';
import { Plus, ThumbsUp, Pizza, Gamepad2, Utensils } from 'lucide-react';

// Mock Data for the Host's Menu
const INITIAL_MENU = [
  { id: 1, name: 'Loaded Nachos', category: 'Appetizers', description: 'Jalapenos, beef, and queso' },
  { id: 2, name: 'Smash Burgers', category: 'Main', description: 'Double patty with house sauce',},
  { id: 3, name:  'Craft Sodas', category: 'Drinks', description: 'Water, Pop, Energy drinks' }
];

// Mock Data for Initial Game Suggestions
const INTIAL_GAMES = [
  { id: 1, name: '