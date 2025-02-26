import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieSlider from './components/MovieSlider';
import MovieDisplay from './components/MovieDisplay';
import MoviePopup from './components/MoviePopup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieInfo from './components/MovieInfo';

const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [headerMovie, setHeaderMovie] = useState({
        title: 'Loading...',
        genres: '',
        genreList: '',
        image: '/public/testImg.jpg'
    });

    useEffect(() => {
        // Fetch featured movie for header
        const fetchHeaderMovie = async () => {
            try {
                const response = await fetch('http://www.omdbapi.com/?apikey=5206816f&i=tt0468569');
                const data = await response.json();
                if (data.Response === "True") {
                    setHeaderMovie({
                        title: data.Title,
                        genres: 'Featured Movie',
                        genreList: data.Genre,
                        image: data.Poster
                    });
                }
            } catch (error) {
                console.error('Error fetching header movie:', error);
            }
        };

        fetchHeaderMovie();
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    return (
        <Router>
            <div className="bg-black text-white font-inter min-h-screen">
                <Header />
                <div className="w-full fixed top-0 z-[1000] overflow-x-visible">
                    <div className="flex justify-center w-full h-[500px] absolute top-0">
                        <div className="w-[40%] bg-black text-white pt-[150px] pl-[70px]">
                            <div className="flex text-[60px] animate-fade-in">
                                <h1>{headerMovie.title}</h1>
                            </div>
                            <div className="flex mt-5 ml-1.25">
                                <p>{headerMovie.genres}</p>
                            </div>
                            <div className="ml-1.25">
                                <p>{headerMovie.genreList}</p>
                            </div>
                            <p className="ml-[250px] underline mt-[-15px] cursor-pointer hover:text-gray-300 transition-colors">
                                View Description
                            </p>
                            <img 
                                src="public/img.png" 
                                alt="Play Button" 
                                className="w-[60%] ml-[-30px] mt-[30px] hover:opacity-80 transition-opacity cursor-pointer" 
                            />
                        </div>
                        <div className="w-[60%] h-full relative">
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-black to-transparent pointer-events-none h-full w-[60rem] z-10"></div>
                            <img 
                                src={headerMovie.image} 
                                alt="Featured Movie" 
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-[500px] p-5 bg-gradient-to-b from-transparent to-black">
                        <h2 className="text-2xl font-bold mb-8 pl-5">Trending Movies by Genre</h2>
                        <MovieSlider genre="action" sliderId="action-slider" />
                        <MovieSlider genre="drama" sliderId="drama-slider" />
                        <MovieSlider genre="comedy" sliderId="comedy-slider" />
                        <MovieSlider genre="horror" sliderId="horror-slider" />
                    </div>
                    <MovieDisplay />
                    {selectedMovie && <MoviePopup movie={selectedMovie} onClose={handleClosePopup} />}
                </div>
                <Routes>
                    <Route path="/info/:imdbID" element={<MovieInfo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;