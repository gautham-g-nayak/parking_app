import { useContext, useState } from "react";
import "./ParkingLots.css";
import { AppContext } from "../App";
import { actions } from "../actions";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../components/PopUpModal";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert";

const ParkingLots = () => {
  const [openModalPopMenu, setOpenModalPopMenu] = useState(false);
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState("");
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();
  const { setSlot } = actions;
  const [appData, dispatchAppData] = useContext(AppContext);

  const handleOpenPopMenu = (index: any) => {
    setOpenModalPopMenu(true);
    setCurrentSpaceIndex(index);
  };

  const handleOpenPayment = (currentIndex: string) => {
    const info = appData.slots[currentIndex];
    dispatchAppData(
      setSlot(currentIndex, info.registerNumber, info.timeIn, Date.now())
    );
    navigate("/payment", { state: currentIndex });
  };

  const allotRandomSlot = () => {
    const freeSlots = Object.entries(appData.slots)
      .filter(([currentIndex, data]: any) => data.registerNumber === "")
      .map(([currentIndex, data]: any) => currentIndex);
    const random = freeSlots[Math.floor(Math.random() * freeSlots.length)];
    if (random !== undefined) {
      handleOpenPopMenu(random);
    } else {
      setIsFull(true);
    }
  };

  return (
    <div className="parkingPageBackground">
      {openModalPopMenu && (
        <PopUpModal
          setOpenModalPopMenu={setOpenModalPopMenu}
          currentSpaceIndex={currentSpaceIndex}
        />
      )}
      <Snackbar
        open={isFull}
        autoHideDuration={2000}
        onClose={() => setIsFull(false)}
      >
        <Alert severity="error">There are no empty parking space</Alert>
      </Snackbar>
      <div className="parkingLotTitle">PARKING LOTS</div>
      <button className="randomButton" onClick={allotRandomSlot}>
        ALLOCATE RANDOM SPACE
      </button>
      <div className="lotsContainer">
        {Object.entries(appData.slots).map(([currentIndex, data]: any) => (
          <button
            className="spaces"
            onClick={() =>
              data.registerNumber
                ? handleOpenPayment(currentIndex)
                : handleOpenPopMenu(currentIndex)
            }
            key={currentIndex}
            style={{
              borderColor: data.registerNumber ? "red" : "#0c7ca8",
              backgroundColor: data.registerNumber ? "#f2d9d3" : "#E8F9FD",
            }}
          >
            {data.registerNumber
              ? `${currentIndex} :${data.registerNumber.toUpperCase()}`
              : `${currentIndex}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParkingLots;
