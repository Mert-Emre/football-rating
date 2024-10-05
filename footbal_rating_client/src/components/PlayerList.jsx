import PlayerInList from "./PlayerInList";
const PlayerList = ({ team, mode, sub }) => {
  if (!team) return;
  let players;
  if (sub) {
    players = team.players.reduce((players, currentPlayer) => {
      const colors =
        currentPlayer.position === "G"
          ? team.goalkeeperColor
          : team.playerColor;
      if (currentPlayer.substitute) {
        players.push(
          <PlayerInList
            jerseyColor={colors.primary}
            outlineColor={colors.outline}
            textColor={colors.number}
            fancyTextColor={colors.fancyNumber}
            jerseyNumber={currentPlayer.jersey}
            shortName={currentPlayer.shortName}
            playerName={currentPlayer.name}
            id={currentPlayer.id}
            played={currentPlayer.played}
            key={currentPlayer.id}
            mode={mode}
            sub={true}
          />
        );
      }
      return players;
    }, []);
  } else {
    players = [];
    players.push(
      <PlayerInList
        jerseyColor={team.goalkeeperColor.primary}
        outlineColor={team.goalkeeperColor.outline}
        textColor={team.goalkeeperColor.number}
        fancyTextColor={team.goalkeeperColor.fancyNumber}
        jerseyNumber={team.players[0].jersey}
        shortName={team.players[0].shortName}
        playerName={team.players[0].name}
        id={team.players[0].id}
        played={true}
        key={team.players[0].id}
        mode={mode}
        sub={false}
      />
    );
    for (let i = 1; i < 10; i++) {
      players.push(
        <PlayerInList
          jerseyColor={team.playerColor.primary}
          outlineColor={team.playerColor.outline}
          textColor={team.playerColor.number}
          fancyTextColor={team.playerColor.fancyNumber}
          jerseyNumber={team.players[i].jersey}
          shortName={team.players[i].shortName}
          playerName={team.players[i].name}
          id={team.players[i].id}
          played={true}
          key={team.players[i].id}
          mode={mode}
          sub={false}
        />
      );
    }
  }
  return <div className="team-player-container">{players}</div>;
};

export default PlayerList;
