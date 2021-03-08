import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

export default function StandingsTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    tabBar: {
      backgroundColor: "#424242",
    },
    tab: {
      fontWeight: 600,
      color: "#eeeeee",
      "&:focus": { outline: 0 },
    },
  });

  const classes = useStyles();

  return (
    <Tabs value={value} onChange={handleChange} className={classes.tabBar}>
      <Tab
        component={Link}
        to="/standings/division"
        className={classes.tab}
        title="Divisional Standings"
        label="Divisional Standings"
      />
      <Tab
        component={Link}
        to="/standings/nhl"
        className={classes.tab}
        title="NHL Standings"
        label="NHL Standings"
      />
    </Tabs>
  );
}
