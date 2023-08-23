import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import { useMovies } from "./useMovies";
import { act } from "react-dom/test-utils";

const initialState = {
  players: [],
  target: 150,
  ready: false,
  query: "",
  activePlayer: "",
  index: 0,
};

function App() {
  const [{ players, target, ready, query, activePlayer, index }, dispatch] =
    useReducer(reducer, initialState);

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
          players: [...state?.players, action.payload],
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
        const updatedPlayers = state.players.map((player) => {
          if (player.id === action.payload.activePlayer) {
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
        };
    }
  }

  // useEffect(() => {
  //   const { movies, isLoading, error } = useMovies();
  //   dispatch({
  //     type: "moviesFetched",
  //     payload: { movies, isLoading, error },
  //   });
  // }, []);

  // useEffect(() => {
  //   async function getMovieDetails() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
  //       );

  //       if (!res.ok) throw new Error(`Something Went Wrong Fetching Details`);

  //       const data = await res.json();
  //       if (data.Response === "False")
  //         throw new Error("Movie Information Not Found");
  //       setMovie(data);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setError(err.message);
  //     }
  //   }

  //   getMovieDetails();
  // }, [selectedId]);

  return (
    <div className="App">
      <Header />
      {!ready && <StartScreen players={players} dispatch={dispatch} />}
      {ready && (
        <Main
          dispatch={dispatch}
          query={query}
          movies={movies}
          players={players}
          target={target}
          activePlayer={activePlayer}
        />
      )}
    </div>
  );
}

export default App;
