import Navbar from "./Components/Navbar";
import StatsTable from "./Components/StatsTable";
import TeamStandings from "./Components/TeamStandings";
import Schedule from "./Components/Schedule";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar key="Nav" />
      <Route path="/standings">
        <TeamStandings />
      </Route>
      <Route path="/stats">
        <StatsTable />
      </Route>
      <Route path="/schedule">
        <Schedule />
      </Route>
    </div>
  );
}

export default App;
