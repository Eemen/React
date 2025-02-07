// src/components/Input.js
import React, { useState, useEffect } from 'react';
import { Card } from './Card';

// eslint-disable-next-line react/prop-types
function Input( {addCard}) {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);














    // Hole einen zufälligen Avatar von der API
    useEffect(() => {
        setLoading(true);
        fetch('https://657869f6f08799dc80453ea2.mockapi.io/persondata')
            .then((response) => response.json())
            .then((data) => {
                const randomPerson = data[Math.floor(Math.random() * data.length)];
                setAvatar(randomPerson.avatar); // Setze den Avatar
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []); // Dieser Effekt läuft nur einmal beim ersten Rendern

    const handleSubmit = () => {
        if (name && job && avatar) {
            addCard(new Card(name, job, avatar));
            setName('');
            setJob('');
            setAvatar('');
        }
    };

    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded mr-4"
            />
            <input
                type="text"
                placeholder="Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="p-2 border rounded mr-4"
            />
            {loading ? (
                <div className="text-gray-600">Loading avatar...</div>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Add Card
                </button>
            )}
        </div>
    );
}

export { Input };
