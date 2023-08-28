import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import { useMovies } from "./useMovies";
import EndScreen from "./components/EndScreen";

const key = `b1bf74f`;

function App() {
  const initialState = {
    players: [],
    target: 150,
    ready: false,
    query: "",
    activePlayer: "",
    index: 0,
    selectedMovieId: "",
    moviesAdded: 0,
  };

  const [
    {
      players,
      target,
      ready,
      query,
      activePlayer,
      selectedMovieId,
      moviesAdded,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const gameWon = moviesAdded === players?.length * 3 && moviesAdded !== 0;

  // useEffect(() => {
  //   if (gameWon) {
  //     dispatch({
  //       type: "gameWon",
  //     });
  //   }
  // }, [gameWon]);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        // setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
        );

        if (!res.ok) throw new Error(`Something Went Wrong Fetching Details`);

        const data = await res.json();
        if (data.Response === "False")
          throw new Error("Movie Information Not Found");

        // setMovie(data);
        // setIsLoading(false);

        dispatch({
          type: "getRating",
          payload: Math.trunc(Number(data.imdbRating) * 10),
        });
      } catch (err) {
        console.log(err);
        // setError(err.message);
      }
    }

    getMovieDetails();
  }, [selectedMovieId]);

  useEffect(() => {
    const pos = players.length - 1;
    if (
      moviesAdded % 3 === 0 &&
      moviesAdded !== 0 &&
      activePlayer !== players[pos].id &&
      players.find((player) => player.id === activePlayer).selectedMovies
        .length === 3
    ) {
      dispatch({
        type: "changePlayer",
      });
    }
  }, [moviesAdded, activePlayer, players]);

  const { movies, isLoading, error } = useMovies(query);

  function reducer(state, action) {
    switch (action.type) {
      case "start":
        return {
          ...state,
          ready: true,
          activePlayer: state.players[state.index].id,
        };
      case "moviesFetched":
        return {
          ...state,
          movies: action.payload.movies,
          isLoading: action.payload.isLoading,
          error: action.payload.error,
        };
      case "addPlayer":
        return {
          ...state,
          players: [...state.players, action.payload],
        };

      case "editQuery":
        return {
          ...state,
          query: action.payload,
        };

      case "editTarget":
        return {
          ...state,
          target: action.payload,
        };
      case "addMovie":
        if (
          state.players
            .find((player) => player.id === state.activePlayer)
            .selectedMovies.find(
              (mov) => mov.imdbID === action.payload.movie.imdbID
            )
        )
          return {
            ...state,
          };
        const updatedPlayers = state.players.map((player) => {
          if (player.id === state.activePlayer) {
            return {
              ...player,
              selectedMovies: [...player.selectedMovies, action.payload.movie],
            };
          }
          return player;
        });
        return {
          ...state,
          players: updatedPlayers,
          selectedMovieId: action.payload.movie.imdbID,
        };

      case "getRating":
        const updated = state.players?.map((player) => {
          if (player.id === state.activePlayer) {
            return {
              ...player,
              score: [...player.score, +action.payload],
            };
          }
          return player;
        });
        return {
          ...state,
          players: updated,
          moviesAdded: state.moviesAdded + 1,
        };

      // case "addRating":
      //   console.log(state.currRating);
      //   return {
      //     ...state,
      //     currRating: action.payload,
      //   };

      case "choosePlayer":
        const foundIndex = state.players.findIndex(
          (player) => player.id === action.payload
        );
        return {
          ...state,
          activePlayer: action.payload,
          selectedMovieId: "",
          index: foundIndex,
        };

      case "changePlayer":
        return {
          ...state,
          index: state.index + 1,
          activePlayer: state.players[state.index + 1].id,
          selectedMovieId: "",
        };

      case "reset":
        return {
          ...initialState,
        };

      case "playAgain":
        const resetPlayers = state.players.map((player) => {
          return {
            ...player,
            score: [],
            selectedMovies: [],
          };
        });
        return {
          ...initialState,
          players: resetPlayers,
        };

      default:
        throw new Error(`Action not recognised`);
    }
  }

  return (
    <div className="App">
      <Header />
      {!ready && !gameWon && (
        <StartScreen players={players} dispatch={dispatch} />
      )}
      {ready && !gameWon && (
        <Main
          dispatch={dispatch}
          query={query}
          movies={movies}
          players={players}
          target={target}
          activePlayer={activePlayer}
          isLoading={isLoading}
          error={error}
          ready={ready}
        />
      )}
      {gameWon && (
        <EndScreen players={players} target={target} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
