import { useSelector } from "react-redux";
import { useFetchFixtureQuery } from "../store";

import "../styles/homeStyle.css";
import LeagueContainer from "../components/LeagueContainer";
import DatePicker from "../components/DatePicker";

const HomePage = () => {
  const selectedDay = useSelector((state) => state.date.day);
  const selectedMonth = useSelector((state) => state.date.month);
  const selectedYear = useSelector((state) => state.date.year);
  const date = new Date(`${selectedYear}/${selectedMonth + 1}/${selectedDay}`);

  const dayStart =
    parseInt(date.getTime()) -
    (parseInt(date.getTime()) % 86400000) +
    parseInt(date.getTimezoneOffset()) * 60 * 1000 +
    86400000;
  const { data, error, isFetching } = useFetchFixtureQuery(dayStart);

  let content;
  if (isFetching) {
    content = <div>loading</div>;
  } else if (error) {
    content = <div>{error}</div>;
  } else {
    const leagues = {};
    data.forEach((match) => {
      if (!leagues[match.tournament]) {
        leagues[match.tournament] = [];
      }
      leagues[match.tournament].push(match);
    });
    const leagueContainers = Object.keys(leagues).map((league) => {
      return (
        <LeagueContainer
          leagueName={league}
          leagueImg={"/images/Flag_of_Turkey.svg"}
          matches={leagues[league]}
          key={league}
        />
      );
    });
    content = <div className="fixture-container">{leagueContainers}</div>;
  }
  return (
    <div className="container">
      <div className="date-container">
        <DatePicker />
      </div>
      {content}
    </div>
  );
};

export default HomePage;
