import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.css';
import imageNotFound from '../../assets/image-not-found.png';
import CircularProgress from '@mui/material/CircularProgress';

export default function MovieCarousel({ id }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTUyZDZlODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';

  useEffect(() => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
    const queryParams = new URLSearchParams({
      language: 'en-US',
      page: 1,
      adult: false,
    });
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch popular movies');
        }

        const data = await response.json();
        setPopularMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setLoading(false);
      }
    };

    // Panggil fungsi fetchPopularMovies saat komponen dimuat
    fetchPopularMovies();
  }, []);

  return (
    <div className="carousel-container">
      {/* Tampilkan CircularProgress selama loading */}
      {loading ? (
        <div className="loading-indicator">
          <CircularProgress />
        </div>
      ) : (
        <>
          <p className='title2'>Populer Movies</p>
          <div className="carousel">
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showStatus={false}
              dynamicHeight={true}
              emulateTouch={true}
              interval={1000}
              showThumbs={2}
              autoPlay={true}
            >
              {popularMovies.map((movie) => (
                <div key={movie.id} className="carousel-item">
                  <img
                    src={
                      movie.backdrop_path != null
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        : imageNotFound
                    }
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
}
