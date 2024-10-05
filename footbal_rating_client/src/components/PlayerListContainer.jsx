import PlayerList from "./PlayerList";
import "../styles/playerList.css";

const PlayerListContainer = ({ homeTeam, awayTeam, mode, sub }) => {
  return (
    <div className="player-list-outer-container">
      <div className="player-list-container">
        <PlayerList team={homeTeam} mode={mode} sub={sub} />
        <PlayerList team={awayTeam} mode={mode} sub={sub} />
      </div>
    </div>
  );
};

export default PlayerListContainer;
