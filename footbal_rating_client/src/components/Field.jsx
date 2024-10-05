import "../styles/field.css";
import { useMediaQuery } from "react-responsive";
import FieldBackground from "./FieldBackground";
import FieldPlayerContainer from "./FieldPlayerContainer";
import PlayerListContainer from "./PlayerListContainer";

const Field = ({ homeTeam, awayTeam, incidents, mode }) => {
  const isSmallTablet = useMediaQuery({ query: "(max-width:650px)" });
  if (isSmallTablet) {
    return (
      <PlayerListContainer
        mode={mode}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        sub={false}
      />
    );
  }
  return (
    <div className="field-container">
      <FieldBackground />
      <FieldPlayerContainer
        mode={mode}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        incidents={incidents}
      />
    </div>
  );
};

export default Field;
