import { useEffect, useState } from "react";

import "./App.css";
import SearchIcon from "./search.svg";
import {MovieCard} from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=60ec6118&";

const App = () => {
  const [movies, setMovies] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); // menambahkan state untuk menyimpan nilai input

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies("Spiderman");
	}, []);

  // menambahkan fungsi handleChange untuk mengubah nilai searchQuery saat input berubah
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // menambahkan fungsi handleSubmit untuk memanggil searchMovies saat tombol search di klik
  const handleSubmit = () => {
    searchMovies(searchQuery);
  };

	return (
		<div className="app">
			<h1>Movie Land</h1>

			<div className="search">
        {/* mengubah value dengan searchQuery */}
				<input placeholder="Cari Film" value={searchQuery} onChange={handleChange} />

				<img src={SearchIcon} alt="Cari" onClick={handleSubmit} />
			</div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
		</div>
	);
};

export default App;
