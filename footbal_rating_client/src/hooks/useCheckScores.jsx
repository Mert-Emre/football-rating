import { useSelector } from "react-redux";
const checkPlayer = (player, playerScores) => {
  if (!player.substitute || (player.substitute && player.played)) {
    const score = playerScores[player.id];
    if (!score) {
      throw new Error(
        "Bütün oyunculara puan vermeden oylamayı tamamlayamazsınız."
      );
    }
  }
};
export const useCheckScores = (match) => {
  const playerScores = useSelector((state) => state.scores.players);
  const managerScores = useSelector((state) => state.scores.managers);
  if (match) {
    return () => {
      match.homeTeam.players.forEach((player) => {
        checkPlayer(player, playerScores);
      });
      match.awayTeam.players.forEach((player) => {
        checkPlayer(player, playerScores);
      });
      if (
        !managerScores[match.homeTeam.manager.id] ||
        !managerScores[match.awayTeam.manager.id]
      ) {
        throw new Error(
          "Menajerlere puan vermeden oylamayı tamamlayamazsınız."
        );
      }
    };
  }
  return () => {};
};
