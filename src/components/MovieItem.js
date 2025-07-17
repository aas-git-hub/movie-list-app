import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

// Use "export default function" so I dont have to export this function at the end of file.
export default function MovieItem({ movie, updateMovie, deleteMovie }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const setRating = (stars) => updateMovie(movie.id, { rating: stars });
  const toggleWatched = () => updateMovie(movie.id, { watched: !movie.watched });

  // Open custom dialog when delete is clicked
  const handleDelete = () => setConfirmOpen(true);

  // Run delete only on "Yes"
  const confirmDelete = () => {
    deleteMovie(movie.id);
    setConfirmOpen(false);
  };

  return (
    <div className={`movie-item${movie.watched ? " watched" : ""}`}>
      <img src={movie.img} alt={movie.title} className="movie-poster" />
      <div className="movie-details">
        <h3>
          {movie.title}
          {movie.watched && (
            <span className="watched-icon" title="Watched">
              ✅
            </span>
          )}
        </h3>
        <div>
          <span className="category">{movie.category}</span>
        </div>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                color: star <= movie.rating ? "#fc0" : "#bbb",
                cursor: "pointer",
                fontSize: "1.3em",
                userSelect: "none",
              }}
              onClick={() => setRating(star)}
              role="button"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setRating(star);
              }}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={toggleWatched}>
          {movie.watched ? "Unmark Watched" : "Mark as Watched"}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Movie"
        message={`Are you sure you want to delete "${movie.title}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
