import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { actions } from "../actions";
import { AppContext } from "../App";
import "./PopUpModal.css";

function PopUpModal({ setOpenModalPopMenu, currentSpaceIndex }: any) {
  const [currentRegNo, setCurrentRegNo] = useState("");
  const { setSlot } = actions;
  const [appData, dispatchAppData] = useContext(AppContext);

  const handleClosePopMenu = () => setOpenModalPopMenu(false);

  const inputHandler = (reg: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrentRegNo(reg.target.value);
  };
  const allotSpace = () => {
    dispatchAppData(setSlot(currentSpaceIndex, currentRegNo, Date.now(), 0));
    handleClosePopMenu();
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div>Enter Register No:</div>
        <TextField
          id="outlined-basic"
          label="Register Number"
          variant="outlined"
          margin="normal"
          className="popUpInput"
          onChange={inputHandler}
        />
        <div className="footer">
          <button
            style={{ backgroundColor: "#0c7ca8", cursor: "pointer" }}
            onClick={handleClosePopMenu}
            className="submitButton"
          >
            CANCEL
          </button>
          <button
            className="submitButton"
            onClick={allotSpace}
            style={{ backgroundColor: "#0c7ca8", cursor: "pointer" }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpModal;
