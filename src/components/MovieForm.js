import React, { useState } from "react";

// Use "export default function" so I dont have to export this function at the end of file.
export default function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [rating, setRating] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !img.trim()) return;
    addMovie({
      id: Date.now(),
      title: title.trim(),
      category: category.trim(),
      img: img.trim(),
      rating,
      watched: false,
    });
    setTitle("");
    setCategory("");
    setImg("");
    setRating(3);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Image path (e.g. /images/interstellar.jpg)"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
}
