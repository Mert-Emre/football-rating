import { useRef, useState } from "react";
import ScoreForm from "./ScoreForm";

const ManagerRef = ({ id, name, mode }) => {
  const inputRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const handleClick = (e) => {
    setFocus(true);
    inputRef.current.focus();
  };
  const handleScoreFocus = () => {
    setFocus(false);
  };
  return (
    <div
      className="manager-item"
      style={{ cursor: mode === "review" ? "auto" : "pointer" }}
      onClick={handleClick}
    >
      <div className="manager-item-name">{name}</div>
      <ScoreForm
        inputRef={inputRef}
        canBeVoted={mode === "review" ? false : true}
        focusCb={handleScoreFocus}
        id={id}
        isPlayer={false}
      />
    </div>
  );
};

export default ManagerRef;
