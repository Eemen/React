// src/components/CardList.jsx

import React, { useState } from 'react';
import { CardComponent } from './Card';

function CardList({ cards }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cards.filter(
        (card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mb-4"
            />
            <div>
                {filteredCards.map((card, index) => (
                    <CardComponent key={index} card={card} />
                ))}
            </div>
        </div>
    );
}

// Stellen Sie sicher, dass CardList hier richtig exportiert wird
export default CardList;
