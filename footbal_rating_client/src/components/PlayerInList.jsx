import PlayerJersey from "./PlayerJersey";

const PlayerInList = ({
  jerseyColor,
  outlineColor,
  textColor,
  fancyTextColor,
  jerseyNumber,
  shortName,
  playerName,
  id,
  played,
  mode,
  sub,
}) => {
  return (
    <div
      className={`player-in-list-container ${
        !sub
          ? "player-in-list-container-eleven"
          : "player-in-list-container-sub"
      }`}
    >
      <PlayerJersey
        jerseyColor={jerseyColor}
        outlineColor={outlineColor}
        textColor={textColor}
        fancyTextColor={fancyTextColor}
        jerseyNumber={jerseyNumber}
        shortName={shortName}
        playerName={playerName}
        id={id}
        substitute={sub}
        mode={mode}
        played={played}
      />
    </div>
  );
};

export default PlayerInList;
