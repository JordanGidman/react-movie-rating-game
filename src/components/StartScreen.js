import FormAddPlayer from "./FormAddPlayer";

function StartScreen({ players, dispatch }) {
  return (
    <div className="start-screen">
      <div>
        <p className="rules">
          <span>Welcome. To start, enter all player names.</span>
          <span>
            Aim: To reach the chosen target score by combining the individual
            percentage rating of three separate movies.
          </span>
          <span>
            Once you begin, pick a target score to aim towards. Players will
            take it in turns to pick three different movies, aiming for the
            target score by combining the individual ratings of the chosen
            movies. The closest to the target score wins.
          </span>
        </p>
      </div>
      <FormAddPlayer players={players} dispatch={dispatch} />
    </div>
  );
}

export default StartScreen;
