import Player from "./Player";
function PlayerList({
  players,
  elsClassName,
  listClassName,
  activePlayer,
  dispatch,
  ready,
}) {
  const playerEls = players.map((player) => (
    <Player
      key={player.id}
      player={player}
      elsClassName={elsClassName}
      activePlayer={activePlayer}
      dispatch={dispatch}
      ready={ready}
    />
  ));

  return (
    <div className={listClassName}>
      <span>Players:</span>
      {playerEls}
    </div>
  );
}

export default PlayerList;
