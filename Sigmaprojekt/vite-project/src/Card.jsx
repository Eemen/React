import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        const { name, job } = this.props;
        return (
            <div className="card bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                <img className="w-16 h-16 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" />
                <div>
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-gray-500">{job}</p>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
};

export default Card;