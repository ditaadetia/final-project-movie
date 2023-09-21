import React, { useState } from 'react';
import imageNotFound from '../image-not-found.png';
import MovieDetail from '../MovieDetail';
import { useNavigate } from 'react-router-dom';

export default function Body({ movies, loading }) {
    const navigate = useNavigate();
    const [expandedOverviews, setExpandedOverviews] = useState({});
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isHovered, setIsHovered] = useState(null);

    const handleCardClick = (movieId) => {
        setSelectedMovie(movieId);
        navigate(`/movie/${movieId}`);
    };

    const handleCardHover = (movieId) => {
        setIsHovered(movieId);
    };

    const handleCardLeave = () => {
        setIsHovered(null);
    };

    const handleReadMoreClick = (movieId) => {
        setExpandedOverviews({
            ...expandedOverviews,
            [movieId]: true,
        });
    };

    return (
        <div className="App">
            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="App">
                    <ul className="home">
                        <div className="flex flex-wrap -mx-2">
                        {movies.map((movie, idx) => (
                            <div
                                key={movie.id + idx}
                                className="w-1/4 px-2 mb-10"
                                onMouseEnter={() => handleCardHover(movie.id)}
                                onMouseLeave={handleCardLeave}
                            >
                            <div className="cursor-pointer" onClick={() => handleCardClick(movie.id)}>
                                {selectedMovie === movie.id ? (
                                    <MovieDetail movie={movie} />
                                ) : (
                                    <div
                                        className={`card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900 hover:shadow-md`}
                                        style={{ opacity: isHovered === movie.id ? 0.8 : 1 }} // Atur opacity saat dihover
                                    >
                                        <div className="relative h-56">
                                            <img
                                                className="object-cover w-full h-full"
                                                src={movie.backdrop_path != null ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : imageNotFound}
                                                alt={movie.title}
                                            />
                                            {isHovered === movie.id && (
                                                // Tampilkan ikon play saat dihover
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-12 w-12 text-white opacity-80 hover:opacity-100 cursor-pointer"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-3">
                                            {isHovered === movie.id ? (
                                                <div>
                                                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                                                        {movie.title}
                                                    </h3>
                                                    <p className="text-xl text-gray-600 dark:text-gray-400">
                                                        {movie.release_date}
                                                    </p>
                                                    <div>
                                                        <div className="text-justify text-xs">{movie.overview}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                                                        {movie.title}
                                                    </h3>
                                                    <p className="text-xl text-gray-600 dark:text-gray-400">
                                                        {movie.release_date}
                                                    </p>
                                                    <p className="text-xs">
                                                        {movie.overview.slice(0, 100)}...
                                                        <span
                                                            className="text-blue-500 cursor-pointer"
                                                            onClick={() => handleReadMoreClick(movie.id)}
                                                        >
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        ))}
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
}
