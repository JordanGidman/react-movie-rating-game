import FormAddPlayer from "./FormAddPlayer";

function StartScreen({ players, dispatch }) {
  return (
    <div className="start-screen">
      <FormAddPlayer players={players} dispatch={dispatch} />
    </div>
  );
}

export default StartScreen;
