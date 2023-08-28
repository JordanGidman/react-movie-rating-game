import Player from "./Player";

function EndScreen({ players, target, dispatch }) {
  const sortedPlayers = players.slice().sort((a, b) => {
    if (
      Math.abs(
        target -
          a.score.reduce((acc, sum) => {
            return acc + Number(sum);
          }, 0)
      ) >
      Math.abs(
        target -
          b.score.reduce((acc, sum) => {
            return acc + Number(sum);
          }, 0)
      )
    )
      return 1;
    else return -1;
  });

  const playerEls = sortedPlayers.map((player) => (
    <Player key={player.id} player={player} gameOver={true} />
  ));
  return (
    <div className="end-screen">
      <h2 className="end-title">Game Over</h2>
      <h3 className="subheading">Target : {target}</h3>
      <p className="end-winner">Winner is: {sortedPlayers[0].name}</p>
      <div className="end-player-list">
        <div>{playerEls}</div>
      </div>
      <div className="end-btns">
        <button
          className="btn-reset"
          onClick={() =>
            dispatch({
              type: "reset",
            })
          }
        >
          Reset
        </button>

        <button
          className="btn-reset"
          onClick={() =>
            dispatch({
              type: "playAgain",
            })
          }
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
