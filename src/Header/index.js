import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjNlYzkxZDM1MTYyZGQ0ZmE5OTY3ODQ1ODIwMTJmZCIsInN1YiI6IjYxZmI0ZGVmNDE0MjkxMDBhMjE3MmM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GPyOocPqIdDWplpMcoOBL7h3htPH6STZhNZn0tFfuDc';

  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    setLoading(true); // Menampilkan indikator loading
    const apiUrl = 'https://api.themoviedb.org/3/search/movie';
    const queryParams = new URLSearchParams({
        include_adult: false,
        language: 'en-US',
        page: 1,
        query: searchTerm,
    });
    fetch(`${apiUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
        setLoading(false);
        onSearch(data.results);
        navigate('/');
    })
    .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
    });
  };

  return (
    <div className="bg-blue-500 p-4 flex items-center justify-between">
      <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="Icon"
            className="w-32"
        />
      <div className="flex">
        <input
          type="text"
          placeholder="Cari film..."
          className="px-2 py-1 rounded-l-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-r-lg"
          onClick={handleSearch}
          disabled={loading} // Menonaktifkan tombol saat indikator loading aktif
        >
          {loading ? "Loading..." : "Cari"} {/* Tampilkan teks "Loading..." saat loading aktif */}
        </button>
      </div>
    </div>
  );
}
