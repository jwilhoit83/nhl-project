import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Hidden from "@material-ui/core/Hidden";

export default function DivisionalStandings({ standings }) {

  const classes = useStyles();

  const divisionTables = standings.map((division) => (
    <TableContainer key={Math.random() * 1000} style={{ width: "100%" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell title="Division" className={classes.stickyColHeader}>
              {division[0].divisionRank.divisionName}
            </TableCell>
            <TableCell title="Games Played" className={classes.colHeadings}>
              GP
            </TableCell>
            <TableCell title="Wins" className={classes.colHeadings}>
              W
            </TableCell>
            <TableCell title="Losses" className={classes.colHeadings}>
              L
            </TableCell>
            <TableCell title="Overtime Losses" className={classes.colHeadings}>
              OT
            </TableCell>
            <TableCell title="Points" className={classes.colHeadings}>
              PTS
            </TableCell>
            <TableCell title="Point Percentage" className={classes.colHeadings}>
              P%
            </TableCell>
            <TableCell title="Regulation Wins" className={classes.colHeadings}>
              RW
            </TableCell>
            <TableCell title="Regulation/Overtime Wins" className={classes.colHeadings}>
              ROW
            </TableCell>
            <TableCell title="Goals For" className={classes.colHeadings}>
              GF
            </TableCell>
            <TableCell title="Goals Against" className={classes.colHeadings}>
              GA
            </TableCell>
            <TableCell title="Goal Differential" className={classes.colHeadings}>
              +/-
            </TableCell>
            <TableCell title="Shootout Record" className={classes.colHeadings}>
              S/O
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {division.map((team) => (
            <TableRow key={team.team.id}>
              <TableCell className={classes.stickyCol}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img style={{ height: 40, width: 40 }} alt={team.team.name + " Logo"} src={team.team.officialLogoImageSrc} />
                  <Hidden smDown>
                    {team.team.city} <Hidden mdDown>{team.team.name}</Hidden>
                  </Hidden>
                </div>
              </TableCell>
              <TableCell className={classes.colStyles}>{team.stats.gamesPlayed}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.wins}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.losses}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.overtimeLosses}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.points}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.pointsPercent.toFixed(3)}</TableCell>
              <TableCell className={classes.colStyles}>
                {team.stats.standings.wins - team.stats.standings.overtimeWins - team.stats.standings.shootoutWins}
              </TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.wins - team.stats.standings.shootoutWins}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.miscellaneous.goalsFor}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.miscellaneous.goalsAgainst}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.miscellaneous.goalsFor - team.stats.miscellaneous.goalsAgainst}</TableCell>
              <TableCell className={classes.colStyles}>{team.stats.standings.shootoutWins + "-" + team.stats.standings.shootoutLosses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ));

  return <>{divisionTables}</>;
}

const useStyles = makeStyles({
  stickyCol: {
    minWidth: "100px",
    maxWidth: "50vw",
    left: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "sticky",
    zIndex: 5,
    backgroundColor: "#424242",
    color: "#eeeeee",
  },
  colHeadings: {
    color: "#FBC02D",
  },
  colStyles: {
    backgroundColor: "#616161",
    color: "#eeeeee",
  },
  stickyColHeader: {
    left: 0,
    zIndex: 6,
    color: "#FBC02D",
  },
});
