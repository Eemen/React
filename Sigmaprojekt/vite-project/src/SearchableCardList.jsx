import React from 'react';
import Card from './Card';

class SearchableCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            searchQuery: '',
            newName: '',
            newJob: ''
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value });
    };

    handleJobChange = (event) => {
        this.setState({ newJob: event.target.value });
    };

    addCard = () => {
        const { newName, newJob, cards } = this.state;
        if (newName && newJob) {
            this.setState({
                cards: [...cards, { name: newName, job: newJob }],
                newName: '',
                newJob: ''
            });
        }
    };

    render() {
        const { cards, searchQuery, newName, newJob } = this.state;
        const filteredCards = cards.filter(card =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.job.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={this.handleNameChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Job"
                        value={newJob}
                        onChange={this.handleJobChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <button onClick={this.addCard} className="bg-blue-500 text-white p-2 rounded w-full">Add Card</button>
                </div>
                <div className="card-list grid grid-cols-1 gap-4">
                    {filteredCards.map((card, index) => (
                        <Card key={index} name={card.name} job={card.job} />
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchableCardList;