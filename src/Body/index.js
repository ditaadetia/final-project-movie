import React, { useState } from 'react';
import imageNotFound from '../assets/image-not-found.png';
import MovieDetail from '../MovieDetail';
import { useNavigate } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Welcome from '../Welcome';
import MovieCardSkeleton from './skeleton'; // Import komponen Skeleton

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
        <Welcome />
        <ul className="home">
            <div className="flex flex-wrap -mx-2">
            {loading ? (
                [...Array(8)].map((_, idx) => (
                <MovieCardSkeleton key={idx} />
                ))
            ) : (
                movies.map((movie, idx) => (
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
                        style={{ opacity: isHovered === movie.id ? 0.8 : 1 }}
                        >
                        <div className="relative h-56">
                            <img
                            className="object-cover w-full h-full"
                            src={
                                movie.backdrop_path != null
                                ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                                : imageNotFound
                            }
                            alt={movie.title}
                            />
                            {isHovered === movie.id && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <PlayCircleIcon style={{ color: 'gray', fontSize: '48px' }} />
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
                                    Read More
                                </span>
                                </p>
                            </div>
                            )}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                ))
            )}
            </div>
        </ul>
        </div>
    );
}
