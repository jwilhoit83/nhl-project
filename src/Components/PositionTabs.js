import {useContext} from 'react';
import HockeyContext from '../context/hockey/hockeyContext';

const PositionTabs = () => {
  const hockeyContext = useContext(HockeyContext);
  const {setPlayers} = hockeyContext;

  function positionFilter(e) {
    if (e.target.innerText === "ALL") {
      setPlayers();
    } else if (e.target.innerText === "SK") {
      setPlayers("c,lw,rw,d");
    } else {
      setPlayers(e.target.innerText);
    }
  }

  return (
    <div className="row m-0">
      <ul className="tabs tabs-fixed-width grey darken-3">
        <li id="all" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="All Players"
            onClick={positionFilter}>
            All
          </button>
        </li>
        <li id="sk" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Skaters"
            onClick={positionFilter}>
            SK
          </button>
        </li>
        <li id="g" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Goalies"
            onClick={positionFilter}>
            G
          </button>
        </li>
        <li id="c" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Centers"
            onClick={positionFilter}>
            C
          </button>
        </li>
        <li id="lw" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Left Wings"
            onClick={positionFilter}>
            LW
          </button>
        </li>
        <li id="rw" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Right Wings"
            onClick={positionFilter}>
            RW
          </button>
        </li>
        <li id="d" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Defensemen"
            onClick={positionFilter}>
            D
          </button>
        </li>
      </ul>
    </div>
  );
}

export default PositionTabs;
