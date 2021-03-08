import Navbar from "./Components/Navbar";
import StatsTable from "./Components/StatsTable";
import InjuryModal from "./Components/InjuryModal";
import TeamStandings from "./Components/TeamStandings";
import Schedule from "./Components/Schedule";
import GamelogModal from "./Components/GamelogModal";
import { Route } from "react-router-dom";
import HockeyState from "./context/hockey/HockeyState";

function App() {
  return (
    <>
      <HockeyState>
        <Navbar />
        <InjuryModal />
        <GamelogModal />
        <Route path="/standings">
          <TeamStandings />
        </Route>
        <Route path="/stats">
          <StatsTable />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
      </HockeyState>
    </>
  );
}

export default App;
