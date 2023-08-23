function Player({ player, elsClassName }) {
  const selectedMovieEls = player.selectedMovies.map((movie) => (
    <img
      key={movie.imdbID}
      src={movie.Poster}
      className="selected-movie-img"
    ></img>
  ));

  return (
    <div className="player-card">
      <h3 className={`${elsClassName}player-name`}>{player.name}</h3>
      <p className={`${elsClassName}player-score`}>Score: {player.score}</p>
      <div className={`${elsClassName}player-selected-movies-list`}>
        <div>{selectedMovieEls}</div>
      </div>
    </div>
  );
}

export default Player;
