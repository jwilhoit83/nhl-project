import { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

export default function Navbar() {
  useEffect(() => {
    let sidenav = document.querySelector("#mobile-menu");
    M.Sidenav.init(sidenav, {edge: 'right'});
  }, []);

  return (
    <>
      <nav className="navbar-spacing grey darken-3">
        <div className="nav-wrapper">
          <span className="left brand-logo blue-grey-text text-lighten-2 flow-text">
            Jrod's Hockey Project
          </span>
            <a
              data-target="mobile-menu"
              href="#!"
              className="sidenav-trigger hide-on-large-only grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light btn-flat right ">
              <i className="material-icons secondary-text">menu</i>
            </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/stats">
                <button className="grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light btn">
                  Player Stats
                </button>
              </Link>
            </li>
            <li>
              <Link to="/standings/division">
                <button className="grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light btn">
                  Team Standings
                </button>
              </Link>
            </li>
            <li>
              <Link to="/schedule">
                <button className="grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light btn">
                  Schedule
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="mobile-menu" className="sidenav grey darken-3">
        <li>
          <Link to="/stats" className="blue-grey-text text-lighten-2 sidenav-close">
            Player Stats
          </Link>
        </li>

        <li>
          <Link to="/standings/division" className="blue-grey-text text-lighten-2 sidenav-close">
            Team Standings
          </Link>
        </li>
        <li>
          <Link to="/schedule" className="blue-grey-text text-lighten-2 sidenav-close">
            Schedule
          </Link>
        </li>
      </ul>
    </>
  );
}
