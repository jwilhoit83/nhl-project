export const scheduleMap = (schedule, teams) => {
  return schedule.slice().map((game) => {
    let homeIdx = teams.findIndex((team) => team.team.id === game.schedule.homeTeam.id);
    let awayIdx = teams.findIndex((team) => team.team.id === game.schedule.awayTeam.id);
    return {
      gameID: game.schedule.id,
      gameTime: new Date(game.schedule.startTime).toString().slice(0, 21),
      homeTeamCity: teams[homeIdx].team.city || "",
      homeTeamName: teams[homeIdx].team.name || "",
      homeLogo: teams[homeIdx].team.officialLogoImageSrc || "",
      homeScore: game.score.homeScoreTotal,
      homeShots: game.score.homeShotsTotal,
      awayTeamCity: teams[awayIdx].team.city || "",
      awayTeamName: teams[awayIdx].team.name || "",
      awayLogo: teams[awayIdx].team.officialLogoImageSrc || "",
      awayScore: game.score.awayScoreTotal,
      awayShots: game.score.awayShotsTotal,
      currentPeriod: game.score.currentPeriod,
      currentIntermission: game.score.currentIntermission,
      currentPeriodTimeRemaining: secondsConverter(game.score.currentPeriodSecondsRemaining),
      playedStatus: game.schedule.playedStatus,
      scheduleStatus: game.schedule.scheduleStatus,
      delayedOrPostponedReason: game.schedule.delayedOrPostponedReason,
    };
  });
};

export const secondsConverter = (sec) => {
  let minutes = Math.floor(Number(sec) / 60);
  let seconds = Number(sec) - minutes * 60;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const setNewDate = (date) => {
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().slice(0, 10);
};

export const formatDate = (date) => {
  return date.replace(/-/g, "");
};
