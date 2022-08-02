import React, { useContext, useState } from "react";
import "./ParkingLots.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AppContext } from "../App";
import { actions } from "../actions";
import { useNavigate } from "react-router-dom";

const ParkingLots = () => {
  const [openModalPopMenu, setOpenModalPopMenu] = useState(false);
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState("");
  const navigate = useNavigate();
  const { setSlot } = actions;
  const [appData, dispatchAppData] = useContext(AppContext);

  const handleClosePopMenu = () => setOpenModalPopMenu(false);
  const handleOpenPopMenu = (index: any) => {
    setOpenModalPopMenu(true);
    setCurrentSpaceIndex(index);
  };

  const PopMenu = () => {
    const [currentRegNo, setCurrentRegNo] = useState("");

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
      <Modal
        className="popUpContainer"
        onClose={handleClosePopMenu}
        open={openModalPopMenu}
      >
        <Box>
          <div className="popUpTitle">Enter Register No:</div>
          <TextField
            id="outlined-basic"
            label="Register Number"
            variant="outlined"
            margin="normal"
            className="popUpInput"
            onChange={inputHandler}
          />
          <Button onClick={handleClosePopMenu}>CLOSE</Button>
          <Button onClick={allotSpace}>SUBMIT</Button>
        </Box>
      </Modal>
    );
  };

  const handleOpenPayment = (currentIndex: string) => {
    const info = appData.slots[currentIndex];
    dispatchAppData(
      setSlot(currentIndex, info.registerNumber, info.timeIn, Date.now())
    );
    navigate("/payment", { state: currentIndex });
  };

  return (
    <div className="parkingPageBackground">
      <PopMenu />
      {/*<Payment/>*/}
      <div className="parkingLotTitle">PARKING LOTS</div>
      <button className="randomButton" onClick={() => {}}>
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
