import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';

function MovieDetail() {
  const [movie, setMovies] = useState([]);
  const { id } = useParams();
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTY3ODQ1ODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';
  const apiUrl = 'https://api.themoviedb.org/3/movie';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovies();
  }, [id, bearerToken]);

  return (
    <div className="movie-card">
      <div className="container">
        <>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="cover" className="cover" />
            <div className="hero" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            }}>
              <div className="details">
                <div className="title1">{movie.title}</div>
                <div className="title2">{movie.tagline}</div>
                <span className="likes">{movie.vote_count}</span>
              </div>
            </div>
            <div className="description">
              <div className="column1">
                {movie.genres ? (
                  movie.genres.map((genre) => (
                    <span className="tag" key={genre.id}>
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span>Loading genres...</span>
                )}
              </div>

              <div className="column2">
                <p>{movie.overview}</p>
              </div>
            </div>
        </>
      </div>
    </div>
  );
}

export default MovieDetail;
