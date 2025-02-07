import React, { useState } from 'react';
import Header from './components/Header';
import MovieSlider from './components/MovieSlider';
import MovieDisplay from './components/MovieDisplay';
import MoviePopup from './components/MoviePopup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieInfo from './components/MovieInfo';

const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    return (
        <Router>
            <div className="bg-black text-white font-inter">
                <Header />
                <div id="content-wrapper" className="w-full fixed top-0 z-[1000] overflow-x-visible">
                    <div id="api-wrapper" className="flex justify-center w-full h-[500px] absolute top-0">
                        <div id="api-content-wrapper" className="w-[40%] bg-black text-white pt-[150px] pl-[70px]">
                            <div id="api-content-wrapper-wrapper1" className="flex text-[60px]">
                                <h1 id="display-title">Title</h1>
                            </div>
                            <div id="api-content-wrapper-wrapper2" className="flex mt-5 ml-1.25">
                                <p id="display-genres">Genres</p>
                            </div>
                            <div id="api-content-wrapper-wrapper3" className="ml-1.25">
                                <p id="display-genre-list">Action, mystery</p>
                            </div>
                            <p id="view-description" className="ml-[250px] underline mt-[-15px]">View Description</p>
                            <img src="public/img.png" alt="img" id="imgplaybutton" className="w-[60%] ml-[-30px] mt-[30px]" />
                        </div>
                        <div id="api-img-wrapper" className="w-[60%] h-full bg-green-500 relative">
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-black to-transparent pointer-events-none h-full w-[60rem]"></div>
                            <img id="display-image" src="/public/testImg.jpg" alt="Selected Movie Image" className="w-[1214px] h-[500px]" />
                        </div>
                    </div>
                    <div id="movie-slider-wrapper" className="mt-[500px] p-5">
                        <h2>Genres</h2>
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