import Movie from "./Movie";
import PlayerList from "./PlayerList";
import TargetSelector from "./TargetSelector";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function Main({
  dispatch,
  query,
  movies,
  players,
  target,
  activePlayer,
  isLoading,
  error,
  ready,
}) {
  const movieEls = movies.map((movie) => (
    <Movie
      key={movie.imdbID}
      movie={movie}
      activePlayer={activePlayer}
      dispatch={dispatch}
    />
  ));

  return (
    <main>
      <TargetSelector target={target} dispatch={dispatch} />

      <div className="main-content">
        <PlayerList
          players={players}
          elsClassName={"main"}
          listClassName={"form-player-list"}
          activePlayer={activePlayer}
          dispatch={dispatch}
          ready={ready}
        />
        <div className="movie-search">
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="search-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              placeholder="Start typing a movie..."
              className="movie-search-input"
              value={query}
              onChange={(e) =>
                dispatch({
                  type: "editQuery",
                  payload: e.target.value,
                })
              }
            />
          </div>
          {isLoading && <Loader />}
          {!isLoading && !error && <div className="movie-list">{movieEls}</div>}
          {error && <ErrorMessage message={error.message} />}
        </div>
      </div>
    </main>
  );
}

export default Main;
