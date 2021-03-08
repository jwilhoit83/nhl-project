import NavbarMat from "./Components/NavbarMat";
import StatsTableMat from "./Components/StatsTableMat";
import InjuryModal from "./Components/InjuryModal";
import TeamStandingsMat from "./Components/TeamStandingsMat";
import ScheduleMat from "./Components/ScheduleMat";
import GamelogModal from "./Components/GamelogModal";
import { Route } from "react-router-dom";
import HockeyState from "./context/hockey/HockeyState";

function App() {
  return (
    <>
      <HockeyState>
        {/* <Navbar key="Nav" /> */}
        <NavbarMat />
        <InjuryModal />
        <GamelogModal />
        <Route path="/standings">
          {/* <TeamStandings /> */}
          <TeamStandingsMat />
        </Route>
        <Route path="/stats">
          {/* <StatsTable /> */}
          <StatsTableMat />
        </Route>
        <Route path="/schedule">
          {/* <Schedule /> */}
          <ScheduleMat />
        </Route>
      </HockeyState>
    </>
  );
}

export default App;
