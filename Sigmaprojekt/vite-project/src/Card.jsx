import React from 'react';

const Card = ({ name, location, image }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
    <img className="w-full h-48 object-cover" src={image} alt="Avatar" />
    <div className="py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p className="text-gray-700 text-base">{location}</p>
    </div>
  </div>
);

export default Card;
