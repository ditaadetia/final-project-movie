import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function MovieCarousel() {
  const [popularMovies, setPopularMovies] = useState([]);
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTY3ODQ1ODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';

  useEffect(() => {
    // Fungsi untuk melakukan permintaan HTTP ke API TMDB
    const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';
    const queryParams = new URLSearchParams({
      include_adult: false,
      page: 1,
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
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    // Panggil fungsi fetchPopularMovies saat komponen dimuat
    fetchPopularMovies();
  }, []);

  return (
    <div className="carousel-container">
      <h2>Popular Movies</h2>
      <div className="carousel w-6/12">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showStatus={false}
          dynamicHeight={true}
          emulateTouch={true}
          interval={5000}
          showThumbs={2} // Menentukan jumlah card yang akan ditampilkan dalam satu frame (slide)
        >
          {popularMovies.map((movie) => (
            <div key={movie.id} className="carousel-item">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                // style={{ width:'30%' }}
              />
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}