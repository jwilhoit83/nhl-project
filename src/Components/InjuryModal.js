import { useContext, useEffect } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import M from "materialize-css/dist/js/materialize.min.js";
import LoadingAnimation from "./LoadingAnimation";

const InjuryModal = () => {
  const hockeyContext = useContext(HockeyContext);
  const { currentInjury, clearCurrentInjury, loading } = hockeyContext;

  useEffect(() => {
    const injuryModal = document.querySelector("#injury-modal");
    M.Modal.init(injuryModal, {
      onCloseEnd: clearCurrentInjury,
    });
    // eslint-disable-next-line
  }, []);

  return currentInjury && !loading ? (
    <div id="injury-modal" className="modal grey darken-3">
      <div className="modal-content">
        <div className="z-depth-3 p-20">
          <h4 className="blue-grey-text text-lighten-2">
            {currentInjury.references.playerReferences[0].firstName +
              " " +
              currentInjury.references.playerReferences[0].lastName}
          </h4>
          <p>
            <span className="blue-grey-text text-lighten-2">
              {new Date(
                currentInjury.playerInjuries[0].injuryHistory.sort(
                  (a, b) => new Date(b.asOfDate) - new Date(a.asOfDate)
                )[0].asOfDate
              ).toDateString() + " - "}
            </span>
            {
              currentInjury.playerInjuries[0].injuryHistory.sort(
                (a, b) => new Date(b.asOfDate) - new Date(a.asOfDate)
              )[0].longDescription
            }
          </p>
        </div>
      </div>
      <div className="modal-footer grey darken-3">
        <button className="btn-floating blue-grey waves-effect waves-light modal-close">
          <i className="small material-icons">close</i>
        </button>
      </div>
    </div>
  ) : (
    <div className="modal grey darken-3" id="injury-modal">
      <div className="modal-content">
        <LoadingAnimation />
      </div>
      <div className="modal-footer grey darken-3">
        <button className="btn-floating blue-grey waves-effect waves-light modal-close">
          <i className="small material-icons">close</i>
        </button>
      </div>
    </div>
  );
};

export default InjuryModal;
