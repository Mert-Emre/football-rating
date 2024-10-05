import { useMediaQuery } from "react-responsive";
import "../styles/fieldPlayerContainer.css";
import PlayerJersey from "./PlayerJersey";

const FieldPlayerContainer = ({ homeTeam, awayTeam, incidents, mode }) => {
  const isTablet = useMediaQuery({ query: "(max-width:820px)" });

  const totalFormation = (team, side) => {
    let totalFormFlexDir;
    let totalFormPadding;
    if (isTablet) {
      totalFormFlexDir = side === "home" ? "column" : "column-reverse";
      totalFormPadding =
        side === "home" ? "0.4rem 0 1rem 0" : "1rem 0 1.6rem 0";
    } else {
      totalFormFlexDir = side === "home" ? "row" : "row-reverse";
      totalFormPadding = "0 1rem";
    }
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: totalFormFlexDir,
          padding: totalFormPadding,
        }}
      >
        {formationLines(team)}
      </div>
    );
  };

  const formationLines = ({
    formation,
    players,
    playerColor,
    goalkeeperColor,
  }) => {
    let totalIndex = 1;
    const formationArray = formation.split("-").map((count, index) => {
      const playersArray = [];

      for (let i = 0; i < parseInt(count); i++) {
        playersArray.push(
          <PlayerJersey
            jerseyColor={playerColor.primary}
            outlineColor={playerColor.outline}
            textColor={playerColor.number}
            fancyTextColor={playerColor.fancyNumber}
            jerseyNumber={players[totalIndex].jersey}
            shortName={players[totalIndex].shortName}
            playerName={players[totalIndex].name}
            id={players[totalIndex].id}
            mode={mode}
            substitute={false}
            played={true}
            key={players[totalIndex].id}
          />
        );
        totalIndex++;
      }
      return (
        <div
          key={index + 1}
          style={{
            display: "flex",
            flexDirection: isTablet ? "row-reverse" : "column",
            justifyContent: "space-around",
          }}
        >
          {playersArray}
        </div>
      );
    });
    formationArray.unshift(
      <div
        key={0}
        style={{
          display: "flex",
          flexDirection: isTablet ? "row-reverse" : "column",
          justifyContent: "center",
        }}
      >
        <PlayerJersey
          jerseyColor={goalkeeperColor.primary}
          outlineColor={goalkeeperColor.outline}
          textColor={goalkeeperColor.number}
          fancyTextColor={goalkeeperColor.fancyNumber}
          jerseyNumber={players[0].jersey}
          shortName={players[0].shortName}
          playerName={players[0].name}
          id={players[0].id}
          mode={mode}
          substitute={false}
          played={true}
          key={players[0].id}
        />
      </div>
    );
    return formationArray;
  };
  return (
    <div className="field-player-container">
      <div className="match-page-home-team-container">
        {totalFormation(homeTeam, "home")}
      </div>
      <div className="match-page-away-team-container">
        {totalFormation(awayTeam, "away")}
      </div>
    </div>
  );
};

export default FieldPlayerContainer;
