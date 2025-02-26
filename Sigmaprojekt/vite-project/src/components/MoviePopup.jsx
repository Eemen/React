import React, { useEffect } from 'react';

const MoviePopup = ({ movie, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!movie) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000] animate-fadeIn"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-zinc-900 p-8 rounded-xl w-[90%] max-w-4xl text-white relative transform scale-95 animate-scaleIn">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    <img 
                        src={movie.Poster} 
                        alt={movie.Title}
                        className="w-full md:w-72 h-auto rounded-lg shadow-xl"
                    />
                    
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4">{movie.Title}</h2>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <InfoItem label="Year" value={movie.Year} />
                            <InfoItem label="Rated" value={movie.Rated} />
                            <InfoItem label="Runtime" value={movie.Runtime} />
                            <InfoItem label="Genre" value={movie.Genre} />
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                            
                            <div className="border-t border-gray-700 pt-4">
                                <InfoItem label="Director" value={movie.Director} />
                                <InfoItem label="Writers" value={movie.Writer} />
                                <InfoItem label="Cast" value={movie.Actors} />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                                    IMDb {movie.imdbRating}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div>
        <span className="text-gray-400 text-sm">{label}: </span>
        <span className="text-white">{value}</span>
    </div>
);

export default MoviePopup;