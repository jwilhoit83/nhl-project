const NHLStandingsMat = ({standings}) => {
  return (
    <table key={Math.random() * 1000} className="grey darken-3">
      <thead>
        <tr>
          <th className="colHeadings stickyColHeader secondary-dark" title="NHL Standings">
            Overall
          </th>
          <th className="colHeadings secondary-dark" title="Games Played">
            GP
          </th>
          <th className="colHeadings secondary-dark" title="Wins">
            W
          </th>
          <th className="colHeadings secondary-dark" title="Losses">
            L
          </th>
          <th className="colHeadings secondary-dark" title="Overtime Losses">
            OT
          </th>
          <th className="colHeadings secondary-dark" title="Points">
            PTS
          </th>
          <th className="colHeadings secondary-dark" title="Point Percentage">
            P%
          </th>
          <th className="colHeadings secondary-dark" title="Regulation Wins">
            RW
          </th>
          <th className="colHeadings secondary-dark" title="Regulation/Overtime Wins">
            ROW
          </th>
          <th className="colHeadings secondary-dark" title="Goals For">
            GF
          </th>
          <th className="colHeadings secondary-dark" title="Goals Against">
            GA
          </th>
          <th className="colHeadings secondary-dark" title="Goal Differential">
            +/-
          </th>
          <th className="colHeadings secondary-dark" title="Shootout Record">
            S/O
          </th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr key={team.team.id}>
            <td className="stickyCol secondary rowstyles secondary px-5">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ height: 40, width: 40 }}
                  alt={team.team.name + " Logo"}
                  src={team.team.officialLogoImageSrc}
                />
                <span className="hide-on-small-only py-5">
                  {team.team.city} <span className="hide-on-med-and-down">{team.team.name}</span>
                </span>
              </div>
            </td>
            <td className="rowstyles">{team.stats.gamesPlayed}</td>
            <td className="rowstyles">{team.stats.standings.wins}</td>
            <td className="rowstyles">{team.stats.standings.losses}</td>
            <td className="rowstyles">{team.stats.standings.overtimeLosses}</td>
            <td className="rowstyles">{team.stats.standings.points}</td>
            <td className="rowstyles">{team.stats.standings.pointsPercent.toFixed(3)}</td>
            <td className="rowstyles">
              {team.stats.standings.wins -
                team.stats.standings.overtimeWins -
                team.stats.standings.shootoutWins}
            </td>
            <td className="rowstyles">
              {team.stats.standings.wins - team.stats.standings.shootoutWins}
            </td>
            <td className="rowstyles">{team.stats.miscellaneous.goalsFor}</td>
            <td className="rowstyles">{team.stats.miscellaneous.goalsAgainst}</td>
            <td className="rowstyles">
              {team.stats.miscellaneous.goalsFor - team.stats.miscellaneous.goalsAgainst}
            </td>
            <td className="rowstyles">
              {team.stats.standings.shootoutWins + "-" + team.stats.standings.shootoutLosses}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NHLStandingsMat;
