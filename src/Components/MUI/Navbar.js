import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    appbarStyles: {
      backgroundColor: "#414141",
      color: theme.secondaryText.color,
      marginBottom: "25px",
    },
    menuListStyles: {
      color: theme.secondaryText.color,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbarStyles} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jrod's Hockey Project
          </Typography>
          <Hidden smDown>
            <Link to="/stats">
              <Button color="secondary">Player Stats</Button>
            </Link>
            <Link to="/standings/division">
              <Button color="secondary">Team Standings</Button>
            </Link>
            <Link to="/schedule">
              <Button color="secondary">Schedule</Button>
            </Link>
          </Hidden>
          <Hidden mdUp>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon color="secondary" />
            </IconButton>
          </Hidden>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem
              className={classes.menuListStyles}
              component={Link}
              to="/stats"
              onClick={handleClose}>
              Player Stats
            </MenuItem>
            <MenuItem
              className={classes.menuListStyles}
              component={Link}
              to="/standings/division"
              onClick={handleClose}>
              Team Standings
            </MenuItem>
            <MenuItem
              className={classes.menuListStyles}
              component={Link}
              to="/schedule"
              onClick={handleClose}>
              Schedule
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
