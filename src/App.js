import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Body from './Body';
import MovieDetail from './MovieDetail'; // Import the MovieDetail component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Import Tailwind CSS
import 'tailwindcss/tailwind.css';


function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTY3ODQ1ODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';

  const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  const queryParams = new URLSearchParams({
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
  });
  const fetchMovies = () => {
    setLoading(true); // Menampilkan indikator loading
    fetch(`${apiUrl}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setLoading(false); // Menyembunyikan indikator loading setelah selesai
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false); // Menyembunyikan indikator loading jika terjadi kesalahan
    });
  };

  useEffect(() => {
      fetchMovies();
  }, [page]);

  // Mengamati event scroll window untuk mengambil lebih banyak data saat mencapai bawah halaman
  useEffect(() => {
      const handleScroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
          {
            setPage(prevPage => prevPage + 1);
          }
        };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const handleSearch = (searchResults) => {
    // Setel hasil pencarian ke state movies
    setMovies(searchResults);
  };

  return (
  <>
    <Header onSearch={handleSearch} />
      <Router>
        <Routes className="body">
          <Route path="/" element={<Body movies={movies} loading={loading}/>} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>

  </>
);
}

export default App;
