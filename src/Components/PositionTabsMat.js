export default function PositionTabsMat({ onClick }) {
  return (
    <div className="row m-0">
      <ul className="tabs tabs-fixed-width grey darken-3">
        <li id="all" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="All Players"
            onClick={onClick}>
            All
          </button>
        </li>
        <li id="sk" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Skaters"
            onClick={onClick}>
            SK
          </button>
        </li>
        <li id="g" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Goalies"
            onClick={onClick}>
            G
          </button>
        </li>
        <li id="c" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Centers"
            onClick={onClick}>
            C
          </button>
        </li>
        <li id="lw" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Left Wings"
            onClick={onClick}>
            LW
          </button>
        </li>
        <li id="rw" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Right Wings"
            onClick={onClick}>
            RW
          </button>
        </li>
        <li id="d" className="tab col s3">
          <button
            className="btn-small btn-flat grey darken-3 blue-grey-text text-lighten-2 waves-effect waves-light"
            title="Defensemen"
            onClick={onClick}>
            D
          </button>
        </li>
      </ul>
    </div>
  );
}
