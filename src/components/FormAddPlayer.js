import { useState } from "react";
import Player from "./Player";
import PlayerList from "./PlayerList";

function FormAddPlayer({ players, dispatch }) {
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleStart() {
    dispatch({
      type: "start",
    });
  }

  function handleAddPlayer(e) {
    e.preventDefault();
    const newPlayer = {
      id: crypto.randomUUID(),
      name: input,
      score: [],
      selectedMovies: [],
      totalRatingScore: 0,
    };

    dispatch({
      type: "addPlayer",
      payload: newPlayer,
    });
  }

  return (
    <>
      <form onSubmit={handleAddPlayer} className="form-add-player">
        <h2 className="add-player-heading">Please Enter Player Names:</h2>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          className="add-player-input"
          placeholder="Enter a name"
        />
        <button
          type="button"
          onClick={handleAddPlayer}
          className="btn-add-player"
        >
          Add
        </button>
        <PlayerList
          players={players}
          elsClassName={""}
          listClassName={"form-player-list-start"}
        />
      </form>
      <button className="btn-start" onClick={handleStart}>
        Start
      </button>
    </>
  );
}

export default FormAddPlayer;
