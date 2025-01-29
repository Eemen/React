import React, { useEffect, useState } from 'react';

// Card class for data modeling
class Card {
    constructor(name, job, avatar) {
        this.name = name;
        this.job = job;
        this.avatar = avatar;
    }
}

// eslint-disable-next-line react/prop-types
function CardComponent({ card }) {
    const [avatar, setAvatar] = useState('');

    // Fetch the data including avatar image from the API
    useEffect(() => {
        fetch('https://657869f6f08799dc80453ea2.mockapi.io/persondata')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API returns the card data, extract the avatar path
                const avatarPath = data[0].avatar;  // Adjust if the structure differs
                setAvatar(avatarPath);
            })
            .catch((error) => {
                console.error('Error fetching avatar:', error);
            });
    }, []);

    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-4">
                {avatar && <img src={avatar} alt={card.name} className="w-12 h-12 rounded-full mr-4" />}
                <div>
                    <h3 className="text-xl font-semibold">{card.name}</h3>
                    <p className="text-gray-600">{card.job}</p>
                </div>
            </div>
        </div>
    );
}

export { Card, CardComponent };
