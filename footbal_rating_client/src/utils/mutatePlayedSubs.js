export const mutatePlayedSubs = (homeTeam, awayTeam, incidents) => {
  incidents.forEach((incident) => {
    if (!incident) return;
    if (incident.incidentType !== "substitution") return;
    const { playerIn, playerOut, isHome } = incident;
    const team = isHome ? homeTeam : awayTeam;
    let outFound,
      inFound = false;
    for (let i = 0; i < team.players.length; i++) {
      if (team.players[i].name === playerOut) {
        team.players[i].out = true;
        outFound = true;
      } else if (team.players[i].name === playerIn) {
        team.players[i].played = true;
        inFound = true;
      }

      if (outFound && inFound) break;
    }
  });
};
