import Player from "./Player";
function PlayerList({ players, elsClassName, listClassName }) {
  const playerEls = players.map((player) => (
    <Player key={player.id} player={player} elsClassName={elsClassName} />
  ));

  return (
    <div className={listClassName}>
      <span>Players:</span>
      {playerEls}
    </div>
  );
}

export default PlayerList;
