import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../store";

const ScoreForm = ({ canBeVoted, inputRef, id, focusCb, isPlayer }) => {
  const dispatch = useDispatch();
  const score = useSelector((state) => {
    if (isPlayer) {
      return state.scores.players[id];
    }
    return state.scores.managers[id];
  });
  const allowed = useSelector((state) => state.scores.allowed);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const val = e.target.value;
    dispatch(addPoint({ isPlayer, id, value: val }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{
        display: canBeVoted ? "block" : "none",
      }}
    >
      <input
        value={score || ""}
        ref={inputRef}
        onChange={handleChange}
        onBlur={() => focusCb()}
        autoComplete="off"
        className="scorable-score-input"
        type="text"
        name={id}
        style={{ cursor: "pointer" }}
        key={"input" + id}
        readOnly={!allowed}
      />
    </form>
  );
};

export default ScoreForm;
