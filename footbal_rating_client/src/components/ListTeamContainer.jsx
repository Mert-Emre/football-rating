const ListTeamContainer = ({ home, teamName, teamLogo }) => {
  return (
    <div
      className={
        "team-container" +
        " " +
        (home ? "home-team-container" : "away-team-container")
      }
    >
      <div className="team-logo">
        <img src={teamLogo} alt={teamName + " logo"} />
      </div>
      <div className="team-name">{teamName}</div>
    </div>
  );
};

export default ListTeamContainer;
