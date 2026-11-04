const { useState } = React;

function Movie({ movie, onRemove, onReview, onRating }) {
  return (
    <div className="movie">
      <div className="movie-header">
        <h2>{movie.title}</h2>
        <button onClick={() => onRemove(movie.id)}>Remove</button>
      </div>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            className={star <= movie.rating ? "selected-star" : ""}
            onClick={() => onRating(movie.id, star)}
            key={star}
          >
            ★
          </button>
        ))}
        <span>{movie.rating}/5</span>
      </div>

      <input
        value={movie.review}
        onChange={(event) => onReview(movie.id, event.target.value)}
        placeholder="Write a review"
      />
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  function addMovie(event) {
    event.preventDefault();

    if (title.trim() === "") return;

    setMovies([
      ...movies,
      {
        id: Date.now(),
        title: title.trim(),
        review: "",
        rating: 0,
      },
    ]);
    setTitle("");
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function changeReview(id, review) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, review: review } : movie
      )
    );
  }

  function changeRating(id, rating) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, rating: rating } : movie
      )
    );
  }

  return (
    <main>
      <h1>My Movie Watch List</h1>

      <form onSubmit={addMovie}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Movie name"
        />
        <button type="submit">Add Movie</button>
      </form>

      {movies.length === 0 && <p className="empty">No movies yet.</p>}

      {movies.map((movie) => (
        <Movie
          movie={movie}
          onRemove={removeMovie}
          onReview={changeReview}
          onRating={changeRating}
          key={movie.id}
        />
      ))}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
