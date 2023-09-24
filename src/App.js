import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Body from './Body';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';


import 'tailwindcss/tailwind.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [apiMovies, setApiMovies] = useState([]); // State baru untuk data dari API
  const [page, setPage] = useState(1);
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTY3ODQ1ODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';
  const apiUrl = 'https://api.themoviedb.org/3/discover/movie';

  // Define handleScroll outside of useEffect
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Define fetchMovies outside of useEffect
  const fetchMovies = (pageToFetch) => {
    setLoading(true);
    const newPage = pageToFetch || page;
    const queryParams = new URLSearchParams({
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: newPage,
      sort_by: 'popularity.desc',
    });

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
      if (data.results.length > 0) {
        // Saat data berhasil diambil, gunakan setApiMovies untuk menggantikan data dari API
        setApiMovies(prevMovies => [...prevMovies, ...data.results]);
        setLoading(false);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (searchResults) => {
    // Saat melakukan pencarian, setApiMovies untuk menggantikan data dari API
    setApiMovies(searchResults);
  };

  return (
    <>
      <Router>
      <Header  onSearch={handleSearch} />
        <Routes className="body">
          <Route path="/" element={
            <InfiniteScroll
              dataLength={apiMovies.length}
              next={() => fetchMovies(page + 1)}
              hasMore={!loading}
              loader={<div className='loading-indicator'><CircularProgress color="primary" size={50} /></div>}
            >
              <Body movies={apiMovies} loading={loading} />
            </InfiniteScroll>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
