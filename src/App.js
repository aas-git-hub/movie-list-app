import React, { useState, useEffect } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import "./App.css";

const initialMovies = [
  {
    id: 1,
    title: "Interstellar",
    category: "Sci-Fi",
    img: "/images/interstellar.jpg",
    rating: 5,
    watched: false,
  },
  {
    id: 2,
    title: "Godzilla",
    category: "Action",
    img: "/images/godzilla.jpg",
    rating: 3,
    watched: false,
  },
  {
    id: 3,
    title: "The Dark Knight",
    category: "Superhero",
    img: "/images/darkknight.jpg",
    rating: 4,
    watched: true,
  },
];

function App() {
  const [movies, setMovies] = useState(() =>
    JSON.parse(localStorage.getItem("movies")) || initialMovies
  );
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Functions to manage movies:
  const addMovie = (movie) => setMovies((mvs) => [...mvs, movie]);

  const updateMovie = (id, newFields) =>
    setMovies((mvs) =>
      mvs.map((m) => (m.id === id ? { ...m, ...newFields } : m))
    );

  const deleteMovie = (id) =>
    setMovies((mvs) => mvs.filter((m) => m.id !== id));

  // Categories + filtering + sorting
  const uniqueCategories = ["All", ...new Set(movies.map((m) => m.category))];

  let visibleMovies = movies;
  if (categoryFilter !== "All")
    visibleMovies = visibleMovies.filter((m) => m.category === categoryFilter);

  if (sortBy === "rating")
    visibleMovies = [...visibleMovies].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "title")
    visibleMovies = [...visibleMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

  return (
    <div className="app-container">
      <h1>My Movie List 🎬</h1>
      <MovieForm addMovie={addMovie} />
      <section className="filter-sort-row">
        <label>
          Filter:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Sort:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </label>
      </section>
      <MovieList
        movies={visibleMovies}
        updateMovie={updateMovie}
        deleteMovie={deleteMovie}
      />
    </div>
  );
}

export default App;