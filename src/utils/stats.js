export const sortingLegend = {
  player: (a, b) => a.player.lastName.localeCompare(b.player.lastName),
  team: (a, b) => a.team.abbreviation.localeCompare(b.team.abbreviation),
  pos: (a, b) => a.player.primaryPosition.localeCompare(b.player.primaryPosition),
  gp: (a, b) => b.stats.gamesPlayed - a.stats.gamesPlayed,
  p: (a, b) => b.stats.scoring.points - a.stats.scoring.points,
  g: (a, b) => b.stats.scoring.goals - a.stats.scoring.goals,
  a: (a, b) => b.stats.scoring.assists - a.stats.scoring.assists,
  pa: (a, b) => b.stats.scoring.primaryAssists - a.stats.scoring.primaryAssists,
  ppg: (a, b) => b.stats.scoring.powerplayGoals - a.stats.scoring.powerplayGoals,
  ppp: (a, b) => b.stats.scoring.powerplayPoints - a.stats.scoring.powerplayPoints,
  shg: (a, b) => b.stats.scoring.shorthandedGoals - a.stats.scoring.shorthandedGoals,
  shp: (a, b) => b.stats.scoring.shorthandedPoints - a.stats.scoring.shorthandedPoints,
  otg: (a, b) => b.stats.scoring.overtimeGoals - a.stats.scoring.overtimeGoals,
  pim: (a, b) => b.stats.penalties.penaltyMinutes - a.stats.penalties.penaltyMinutes,
  fights: (a, b) => b.stats.penalties.fights - a.stats.penalties.fights,
  s: (a, b) =>
    (b.stats.skating ? b.stats.skating.shots : -1) - (a.stats.skating ? a.stats.skating.shots : -1),
  h: (a, b) =>
    (b.stats.skating ? b.stats.skating.hits : -1) - (a.stats.skating ? a.stats.skating.hits : -1),
  toi: (a, b) =>
    b.stats.shifts.timeOnIceSeconds / b.stats.gamesPlayed -
    a.stats.shifts.timeOnIceSeconds / a.stats.gamesPlayed,
  blk: (a, b) =>
    (b.stats.skating ? b.stats.skating.blockedShots : -1) -
    (a.stats.skating ? a.stats.skating.blockedShots : -1),
  sv: (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.saves : -1) -
    (a.stats.goaltending ? a.stats.goaltending.saves : -1),
  gaa: (a, b) =>
    (a.stats.goaltending && a.stats.goaltending.saves !== 0
      ? a.stats.goaltending.goalsAgainstAverage
      : 50) -
    (b.stats.goaltending && b.stats.goaltending.saves !== 0
      ? b.stats.goaltending.goalsAgainstAverage
      : 50),
  "sv%": (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.savePercentage : -1) -
    (a.stats.goaltending ? a.stats.goaltending.savePercentage : -1),
  gs: (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.gamesStarted : -1) -
    (a.stats.goaltending ? a.stats.goaltending.gamesStarted : -1),
  w: (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.wins : -1) -
    (a.stats.goaltending ? a.stats.goaltending.wins : -1),
  l: (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.losses : -1) -
    (a.stats.goaltending ? a.stats.goaltending.losses : -1),
  so: (a, b) =>
    (b.stats.goaltending ? b.stats.goaltending.shutouts : -1) -
    (a.stats.goaltending ? a.stats.goaltending.shutouts : -1),
  ga: (a, b) =>
    (a.stats.goaltending && a.stats.goaltending.saves !== 0
      ? a.stats.goaltending.goalsAgainst
      : 50) -
    (b.stats.goaltending && b.stats.goaltending.saves !== 0
      ? b.stats.goaltending.goalsAgainst
      : 50),
};

export const playerMap = (players) => {
  let newPlayers = players.map((player) => {
    let fullName = player.player.firstName + " " + player.player.lastName;
    let injury = player.player.currentInjury
      ? player.player.currentInjury.playingProbability.slice(0, 5)
      : "";
    let scoring = player.stats.scoring;
    let skating = player.stats.skating;
    let goaltending = player.stats.goaltending;
    return {
      id: player.player.id,
      name: fullName,
      firstName: player.player.firstName,
      lastName: player.player.lastName,
      injury: injury,
      injuryDescription: injury ? player.player.currentInjury.description.toUpperCase() : "",
      team: player.team.abbreviation,
      position: player.player.primaryPosition,
      gamesPlayed: player.stats.gamesPlayed,
      points: scoring.points,
      goals: scoring.goals,
      assists: scoring.assists,
      primaryAssists: scoring.primaryAssists,
      powerplayGoals: scoring.powerplayGoals,
      powerplayPoints: scoring.powerplayPoints,
      shorthandedGoals: scoring.shorthandedGoals,
      shorthandedPoints: scoring.shorthandedPoints,
      overtimeGoals: scoring.overtimeGoals,
      shots: skating ? skating.shots : "",
      hits: skating ? skating.hits : "",
      timeOnIcePerGame: toiConverter(player),
      penaltyMinutes: player.stats.penalties.penaltyMinutes,
      fights: player.stats.penalties.fights,
      blockedShots: skating ? skating.blockedShots : "",
      saves: goaltending ? goaltending.saves : "",
      goalsAgainst: goaltending ? goaltending.goalsAgainst : "",
      goalsAgainstAverage: goaltending ? goaltending.goalsAgainstAverage.toFixed(3) : "",
      savePercentage: goaltending ? goaltending.savePercentage.toFixed(3) : "",
      gamesStarted: goaltending ? goaltending.gamesStarted : "",
      wins: goaltending ? goaltending.wins : "",
      losses: goaltending ? goaltending.losses : "",
      shutouts: goaltending ? goaltending.shutouts : "",
    };
  });
  return newPlayers;
};

export const toiConverter = (sec) => {
  let minutes = Math.floor(sec.stats.shifts.timeOnIceSeconds / 60 / sec.stats.gamesPlayed);
  let seconds = (sec.stats.shifts.timeOnIceSeconds / sec.stats.gamesPlayed - minutes * 60).toFixed(
    0
  );
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
