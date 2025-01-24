import React from 'react';
import Card from './Card';

class SearchableCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            searchQuery: '',
        };
    }

    componentDidMount() {
        // Simuliere API-Abruf
        const apiData = [
            { name: 'John Doe', job: 'Developer' },
            { name: 'Jane Smith', job: 'Designer' },
        ];

        this.setState({ cards: apiData });
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        const { cards, searchQuery } = this.state;
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
