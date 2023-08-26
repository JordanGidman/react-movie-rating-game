import Player from "./Player";

function EndScreen({ players, target, dispatch }) {
  const sortedPlayers = players.slice().sort((a, b) => {
    console.log(a);
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

  console.log(sortedPlayers);

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
      <button
        className="reset-btn"
        onClick={() =>
          dispatch({
            type: "reset",
          })
        }
      >
        Reset
      </button>
    </div>
  );
}

export default EndScreen;
