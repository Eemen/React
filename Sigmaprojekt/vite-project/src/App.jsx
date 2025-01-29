// src/App.js
import React, { useState } from 'react';
import CardList from './components/CardList.jsx';  // Import mit default
import { Card } from './components/Card';
import { Input } from './components/Input';

function App() {
    const [cards, setCards] = useState([]);

    const addCard = (card) => {
        setCards([...cards, card]);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Card List</h1>
            <Input addCard={addCard} />
            <CardList cards={cards} />
        </div>
    );
}

export default App;
