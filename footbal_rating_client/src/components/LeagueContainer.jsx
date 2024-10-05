import MatchContainer from "../components/MatchContainer";

const LeagueContainer = ({ leagueName, leagueImg, matches }) => {
  console.log(matches);
  const matchList = matches.map((match) => {
    return <MatchContainer match={match} key={match.id} />;
  });
  return (
    <div className="league-container">
      <div className="league-header">
        <div
          className="league-country"
          style={{ backgroundImage: `url(${leagueImg})` }}
        ></div>
        <div className="league-name">{leagueName}</div>
      </div>
      <div className="match-list">{matchList}</div>
    </div>
  );
};

export default LeagueContainer;
