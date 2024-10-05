import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ScoreForm from "./ScoreForm";
import "../styles/playerJersey.css";
import { maxContrast, hexToRgb } from "../utils/colorUtils";

const calcScoreBgColor = (score) => {
  if (score === "N/A") {
    return "hsl(193,100%,40%)";
  }
  const h = (score - 1) * 12;
  const s = 100;
  const l = 50;
  return `hsl(${h},${s}%,${l}%)`;
};

const PlayerJersey = ({
  jerseyColor,
  textColor,
  jerseyNumber,
  outlineColor,
  fancyTextColor,
  mode,
  id,
  shortName,
  playerName,
  substitute,
  played,
}) => {
  const scoreFromDb = useSelector((state) => state.scores.playersTotal[id]);
  const totalVotes = useSelector((state) => state.scores.totalVotes);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const handleColor = (color) => {
    return color.startsWith("#") ? color : `#${color}`;
  };

  const handleClick = (e) => {
    if (!substitute || played) {
      setFocus(true);
      inputRef.current.focus();
    }
  };
  const handleScoreFocus = () => {
    setFocus(false);
  };
  const contrastTextColor = maxContrast(
    hexToRgb(jerseyColor),
    hexToRgb(textColor),
    hexToRgb(fancyTextColor)
  )
    ? textColor
    : fancyTextColor;
  let contrastOutlineColor = maxContrast(
    hexToRgb(jerseyColor),
    hexToRgb("#ffffff"),
    hexToRgb("#222222")
  )
    ? "#ffffff"
    : "#222222";

  const isSmallTablet = useMediaQuery({ query: "(max-width:650px)" });
  contrastOutlineColor =
    substitute || isSmallTablet ? "#ffffff" : contrastOutlineColor;
  if (mode === "review") {
    const scoreBg = calcScoreBgColor(
      totalVotes ? scoreFromDb / totalVotes : "N/A"
    );
    return (
      <div className="jersey-container">
        <div className="jersey-inner-container">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 981 870"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M316.581,1.931C260.771,22.624 61.627,106.555 9.216,132.284C1.722,135.963 -0.029,148.235 2.119,156.302C12.528,195.39 56.281,330.036 71.669,366.812C74.878,374.48 86.161,376.335 94.45,376.958C118.191,378.744 193.97,376.691 214.114,377.526C215.646,377.589 215.22,380.437 215.315,381.968C215.502,385.005 215.239,391.155 215.238,395.749C215.219,473.775 212.024,771.323 215.201,850.127C215.558,858.97 225.545,867.3 234.304,868.57C256.936,871.85 312.094,869.802 350.992,869.81C436.133,869.828 676.089,872.091 745.152,868.68C754.468,868.219 764.319,858.608 765.374,849.341C768.971,817.749 766.553,735.866 766.735,679.127C766.986,600.54 765.749,428.296 766.882,377.823C766.933,375.548 771.26,376.315 773.535,376.291C795.383,376.064 874.536,379.134 897.968,376.46C905.549,375.594 910.62,365.156 914.125,360.243C916.861,356.409 917.539,351.459 919,346.982C929.952,313.42 971.708,195.052 979.84,158.867C982.135,148.656 976.713,135.346 967.792,129.874C946.107,116.573 889.263,95.581 849.733,79.062C798.608,57.697 696.703,13.311 661.042,1.685C652.676,-1.042 644.055,6.348 635.769,9.309C621.079,14.558 594.781,28.292 572.907,33.179C548.373,38.661 516.113,42.338 488.566,42.198C461.386,42.06 431.706,38.019 407.624,32.34C385.561,27.137 359.249,13.192 344.075,8.124C335.165,5.148 325.389,-1.335 316.581,1.931Z"
              style={{
                stroke: handleColor(outlineColor),
                strokeWidth: "5px",
                fill: handleColor(jerseyColor),
              }}
            />
          </svg>
          <div
            className="jersey-number"
            style={{ color: handleColor(contrastTextColor) }}
          >
            {jerseyNumber}
          </div>
        </div>
        <div className="jersey-player-name">{shortName || playerName}</div>
        {(!substitute || played) && (
          <div
            className="player-score-from-db"
            style={{
              backgroundColor: scoreBg,
            }}
          >
            {totalVotes ? (scoreFromDb / totalVotes).toFixed(1) : "N/A"}
          </div>
        )}
      </div>
    );
  } else if (mode === "poll") {
    return (
      <div
        className="jersey-container"
        style={{ cursor: played ? "pointer" : "auto" }}
        onClick={handleClick}
      >
        <div className="jersey-inner-container">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 981 870"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M316.581,1.931C260.771,22.624 61.627,106.555 9.216,132.284C1.722,135.963 -0.029,148.235 2.119,156.302C12.528,195.39 56.281,330.036 71.669,366.812C74.878,374.48 86.161,376.335 94.45,376.958C118.191,378.744 193.97,376.691 214.114,377.526C215.646,377.589 215.22,380.437 215.315,381.968C215.502,385.005 215.239,391.155 215.238,395.749C215.219,473.775 212.024,771.323 215.201,850.127C215.558,858.97 225.545,867.3 234.304,868.57C256.936,871.85 312.094,869.802 350.992,869.81C436.133,869.828 676.089,872.091 745.152,868.68C754.468,868.219 764.319,858.608 765.374,849.341C768.971,817.749 766.553,735.866 766.735,679.127C766.986,600.54 765.749,428.296 766.882,377.823C766.933,375.548 771.26,376.315 773.535,376.291C795.383,376.064 874.536,379.134 897.968,376.46C905.549,375.594 910.62,365.156 914.125,360.243C916.861,356.409 917.539,351.459 919,346.982C929.952,313.42 971.708,195.052 979.84,158.867C982.135,148.656 976.713,135.346 967.792,129.874C946.107,116.573 889.263,95.581 849.733,79.062C798.608,57.697 696.703,13.311 661.042,1.685C652.676,-1.042 644.055,6.348 635.769,9.309C621.079,14.558 594.781,28.292 572.907,33.179C548.373,38.661 516.113,42.338 488.566,42.198C461.386,42.06 431.706,38.019 407.624,32.34C385.561,27.137 359.249,13.192 344.075,8.124C335.165,5.148 325.389,-1.335 316.581,1.931Z"
              style={{
                stroke: focus ? contrastOutlineColor : "transparent",
                strokeWidth: "2.4rem",
                fill: handleColor(jerseyColor),
              }}
            />
          </svg>
          <div
            className="jersey-number"
            style={{ color: handleColor(contrastTextColor) }}
          >
            {jerseyNumber}
          </div>
        </div>
        <div className="jersey-player-name">{shortName || playerName}</div>
        <ScoreForm
          inputRef={inputRef}
          canBeVoted={played}
          id={id}
          focusCb={handleScoreFocus}
          isPlayer={true}
        />
      </div>
    );
  }
};

export default PlayerJersey;
