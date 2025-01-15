import React, { useState } from 'react';
import Card from './Card';  // Importiere die Card-Komponente

const SearchableCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const data = [
    { name: 'Max Mustermann', location: 'Berlin', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { name: 'Anna Meier', location: 'Hamburg', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { name: 'John Doe', location: 'München', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    // Weitere Daten hier hinzufügen
  ];

  const handleSearch = () => {
    setFilteredData(
      data.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Suchen..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded p-2 ml-2"
        >
          Suchen
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((person, index) => (
          <Card key={index} name={person.name} location={person.location} image={person.image} />
        ))}
      </div>
    </div>
  );
};

export default SearchableCardList;
