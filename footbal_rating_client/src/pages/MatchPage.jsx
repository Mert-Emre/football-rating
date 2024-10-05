import axios from "axios";
import { useDetailedMatchQuery } from "../store/apis/fixtureApi";
import { useParams } from "react-router-dom";
import { RiNumbersFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";

import "../styles/matchPage.css";
import Field from "../components/Field";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useError } from "../hooks/useError";
import {
  allowUser,
  resetScores,
  addUserPointsFromDb,
  addTotalPointsFromDb,
} from "../store";
import { useCheckScores } from "../hooks/useCheckScores";
import PlayerListContainer from "../components/PlayerListContainer";
import ManagerContainer from "../components/ManagerContainer";

const MatchPage = () => {
  const { matchId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetScores());
    const checkAllowance = async () => {
      try {
        const response = await axios.get(
          `https://football-rating-server.onrender.com/api/check-user-score/${matchId}`,
          { withCredentials: true }
        );
        dispatch(allowUser());
      } catch (err) {
        if (err.response.status === 403) {
          dispatch(
            addUserPointsFromDb({
              managers: err.response.data.managers,
              players: err.response.data.players,
            })
          );
        }
      }
    };

    const fetchTotalScores = async () => {
      try {
        const response = await axios.get(
          `https://football-rating-server.onrender.com/api/get-total-scores/${matchId}`,
          { withCredentials: true }
        );
        dispatch(
          addTotalPointsFromDb({
            players: response.data.players,
            managers: response.data.managers,
            totalVotes: response.data.totalVotes,
          })
        );
      } catch (err) {}
    };
    checkAllowance();
    fetchTotalScores();
  }, [dispatch, matchId]);

  const user = useSelector((state) => state.auth.user);
  const scores = useSelector((state) => state.scores);
  const [mode, setMode] = useState("review");
  const { data } = useDetailedMatchQuery(matchId);
  const [errors, setErrors] = useState({});
  const checkScores = useCheckScores(data);
  const handleSubmit = async () => {
    try {
      checkScores();
      const response = await axios.post(
        "https://football-rating-server.onrender.com/api/save-score",
        { ...scores, id: matchId },
        {
          withCredentials: true,
        }
      );
      dispatch(resetScores());
      dispatch(
        addTotalPointsFromDb({
          players: response.data.playersTotal,
          managers: response.data.managersTotal,
          totalVotes: response.data.totalVotes,
        })
      );
      dispatch(
        addUserPointsFromDb({
          players: response.data.players,
          managers: response.data.managers,
        })
      );
    } catch (err) {
      setErrors({ error: err.message });
    }
  };
  let content;
  if (data) {
    content = (
      <>
        <Field
          mode={mode}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          incidents={data.incidents}
        />
        <PlayerListContainer
          mode={mode}
          homeTeam={data.homeTeam}
          awayTeam={data.awayTeam}
          sub={true}
        />
        <ManagerContainer
          mode={mode}
          awayManager={data.awayTeam.manager}
          homeManager={data.homeTeam.manager}
        />
        <button
          className="match-page-submit-points"
          onClick={handleSubmit}
          disabled={!scores.allowed}
        >
          Oyla
        </button>
      </>
    );
  }
  return (
    <div className="match-page-outer-container">
      <div className="match-page-mode-selector-container">
        <IoEyeSharp
          className={`match-page-icon ${
            mode === "review" ? "match-page-active-icon" : ""
          }`}
          onClick={() => setMode("review")}
        />
        <RiNumbersFill
          title={!user ? "Üye girişi yapmadan oy kullanamazsınız." : ""}
          className={`match-page-icon ${
            mode === "review" && !user ? "match-page-restricted-icon" : ""
          } ${mode === "poll" ? "match-page-active-icon" : ""}`}
          onClick={() => {
            if (user) {
              setMode("poll");
            }
          }}
        />
      </div>
      {content}
      {useError(errors, "error")}
    </div>
  );
};

export default MatchPage;
