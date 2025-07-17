import React from "react";
import MovieItem from "./MovieItem";

// Use "export default function" so I dont have to export this function at the end of file.
export default function MovieList({ movies, updateMovie, deleteMovie }) {
  if (!movies.length) return <div>No movies found.</div>;
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          updateMovie={updateMovie}
          deleteMovie={deleteMovie}
        />
      ))}
    </div>
  );
}
