import { Link } from "react-router-dom";

export default function StandingsTabsMat() {
  return (
    <div className="row m-0">
      <ul className="tabs grey darken-3">
        <li id="div" className="tab col s3" title="Divisional Standings">
          <Link to="/standings/division">
            <button className="btn btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light">
              Divisional Standings
            </button>
          </Link>
        </li>
        <li id="nhl" className="tab col s3" title="NHL Standings">
          <Link to="/standings/nhl">
            <button className="btn btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light">
              NHL Standings
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}