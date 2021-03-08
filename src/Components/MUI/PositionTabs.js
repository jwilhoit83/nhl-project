import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function PositionTabs({ onClick }) {
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
    <Tabs
      value={value}
      onChange={handleChange}
      className={classes.tabBar}
      variant='scrollable'
      scrollButtons='on'
      indicatorColor='secondary'
    >
      <Tab className={classes.tab} title="All Players" onClick={onClick} label="ALL" />
      <Tab className={classes.tab} title="Skaters" onClick={onClick} label="SK" />
      <Tab className={classes.tab} title="Goalies" onClick={onClick} label="G" />
      <Tab className={classes.tab} title="Centers" onClick={onClick} label="C" />
      <Tab className={classes.tab} title="Left Wingers" onClick={onClick} label="LW" />
      <Tab className={classes.tab} title="Right Wingers" onClick={onClick} label="RW" />
      <Tab className={classes.tab} title="Defensemen" onClick={onClick} label="D" />
    </Tabs>
  );
}
