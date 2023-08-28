import { useState } from "react";
import PlayerList from "./PlayerList";
import { useKey } from "../useKey";
import { useRef } from "react";

function FormAddPlayer({ players, dispatch }) {
  const [input, setInput] = useState("");

  const inputEl = useRef(null);

  function selectCurrentEl() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setInput("");
  }

  useKey("Enter", function () {
    selectCurrentEl();
  });

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

    if (newPlayer.name !== "")
      dispatch({
        type: "addPlayer",
        payload: newPlayer,
      });

    setInput("");
    selectCurrentEl();
  }

  return (
    <>
      <form onSubmit={handleAddPlayer} className="form-add-player">
        <h2 className="add-player-heading">Please enter player names:</h2>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          className="add-player-input"
          placeholder="Enter a name"
          ref={inputEl}
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
