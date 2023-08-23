function Movie({ movie, activePlayer, dispatch }) {
  return (
    <div
      key={movie.imdbID}
      className="movie"
      onClick={() =>
        dispatch({
          type: "addMovie",
          payload: { movie, activePlayer },
        })
      }
    >
      <img
        src={movie.Poster}
        className="movie-img"
        alt={`${movie.Title} poster`}
      />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">🗓️ {movie.Year}</p>
    </div>
  );
}

export default Movie;
