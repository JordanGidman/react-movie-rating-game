function TargetSelector({ target, dispatch }) {
  return (
    <div className="target-selector">
      <h3 className="target-selector-title">Please Choose A Target Rating</h3>
      <select
        className="target-input"
        value={target}
        onChange={(e) =>
          dispatch({
            type: "editTarget",
            payload: e.target.value,
          })
        }
      >
        <option>100</option>
        <option>150</option>
        <option>180</option>
        <option>200</option>
      </select>
      <p className="target-display-text">
        Your Target is: <strong>{target}</strong>
      </p>
    </div>
  );
}

export default TargetSelector;
