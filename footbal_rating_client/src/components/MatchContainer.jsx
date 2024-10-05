import ListTeamContainer from "../components/ListTeamContainer";
import { useImageFinder } from "../hooks/useImageFinder";
import { Link } from "react-router-dom";

const MatchContainer = ({ match }) => {
  const homeLogo = useImageFinder(match.homeTeam);
  const awayLogo = useImageFinder(match.awayTeam);
  const awayTeam =
    match.awayTeam === "Yılport Samsunspor" ? "Samsunspor" : match.awayTeam;
  const homeTeam =
    match.homeTeam === "Yılport Samsunspor" ? "Samsunspor" : match.homeTeam;

  return (
    <Link
      to={`/match/${match.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="match-container">
        <div className="match-header">
          <div className="match-hour">
            {new Date(match.timestamp).toLocaleTimeString("tr").slice(0, -3)}
          </div>
        </div>
        <ListTeamContainer
          home={true}
          teamName={homeTeam}
          teamLogo={homeLogo}
        />
        <div className="score">
          <div className="home-score">{match.homeScore.normaltime}</div>
          <div className="score-hyphen">-</div>
          <div className="away-score">{match.awayScore.normaltime}</div>
        </div>
        <ListTeamContainer
          home={false}
          teamName={awayTeam}
          teamLogo={awayLogo}
        />
      </div>
    </Link>
  );
};

export default MatchContainer;
