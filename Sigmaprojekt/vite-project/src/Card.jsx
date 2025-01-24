import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


// Card Component
const Card = ({ name, job, avatar }) => {
    return (
        <div className="card bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105">
            <img className="w-16 h-16 rounded-full" src={avatar} alt="Profile" />
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-gray-500">{job}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

// Main App Component
const App = () => {
    const [person, setPerson] = useState(null);

    useEffect(() => {
        // Fetch the data from the API
        fetch('https://657869f6f08799dc80453ea2.mockapi.io/persondata/1')
            .then((response) => response.json())
            .then((data) => setPerson(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app flex justify-center items-center min-h-screen bg-gray-100">
            <Card name={person.name} job={person.jobtitle} avatar={person.avatar} />
        </div>
    );
};

export default App;
