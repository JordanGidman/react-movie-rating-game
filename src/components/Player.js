function Player({
  player,
  elsClassName,
  gameOver = false,
  activePlayer,
  dispatch,
  ready,
}) {
  const selectedMovieEls = player.selectedMovies.map((movie, i) =>
    gameOver ? (
      <div className="end-poster" key={movie.imdbID}>
        <img
          key={movie.imdbID}
          src={movie.Poster}
          className={`selected-movie-img ${gameOver && "end-screen-poster"}`}
          alt={`poster for ${movie.name}`}
        ></img>
        {gameOver && (
          <p className="end-screen-movie-rating">{player.score[i]}</p>
        )}
      </div>
    ) : (
      <img
        key={movie.imdbID}
        src={movie.Poster}
        className={`selected-movie-img ${gameOver && "end-screen-poster"}`}
        alt={`poster for ${movie.name}`}
      ></img>
    )
  );

  return (
    <div
      className={`player-card ${activePlayer === player.id ? "active" : ""}`}
      onClick={() => {
        ready &&
          dispatch({
            type: "choosePlayer",
            payload: player.id,
          });
      }}
    >
      <h3 className={`${elsClassName}player-name ${gameOver && "end-name"}`}>
        {player.name}
      </h3>
      {gameOver && (
        <p className={`${elsClassName}player-score ${gameOver && "end-score"}`}>
          Score: {player.score.reduce((acc, val) => acc + val, 0)}
        </p>
      )}
      <div className={`${elsClassName}player-selected-movies-list`}>
        <div className={gameOver ? "end-movie-list" : ""}>
          {selectedMovieEls}
        </div>
      </div>
    </div>
  );
}

export default Player;
