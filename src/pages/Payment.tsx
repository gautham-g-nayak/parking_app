import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { actions } from "../actions";
import axios from "axios";
import "./Payment.css";
import { CircularProgress } from "@mui/material";

const Payment = () => {
  const location: any = useLocation();
  const { setSlot } = actions;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appData, dispatchAppData] = useContext(AppContext);

  const info = appData.slots[location.state];
  const totalParkingTime = info.timeOut - info.timeIn;
  let parkingCharge: number;
  if (totalParkingTime <= 3600000 * 2) {
    parkingCharge = 10;
  } else {
    parkingCharge = (Math.floor(totalParkingTime / 3600000) - 2) * 10 + 10;
  }

  const handleClosePayment = () => {
    dispatchAppData(
      setSlot(location.state, info.registerNumber, info.timeIn, 0)
    );
    navigate("/parking-lots", { replace: true });
  };

  const paymentGateWay = () => {
    setLoading(true);
    axios
      .post("https://httpstat.us/200", {
        "car-registration": info.registerNumber.toUpperCase(),
        charge: parkingCharge,
      })
      .then(function (response) {
        setLoading(false);
        console.log(response);
        dispatchAppData(setSlot(location.state, "", 0, 0));
        navigate("/parking-lots", { replace: true });
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  function msToTime(src: number) {
    const ms = src % 1000;
    src = (src - ms) / 1000;
    const secs = src % 60;
    src = (src - secs) / 60;
    const minutes = src % 60;
    const hrs = (src - minutes) / 60;
    return hrs + " hours : " + minutes + " minutes : " + secs + " seconds";
  }

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="parkingPageBackground">
      <div className="parkingLotTitle">PARKING DETAILS:</div>
      <div className="section">
        <div className="subHeading">Vehicle Register Number :</div>
        <div className="details"> {info.registerNumber.toUpperCase()}</div>
      </div>
      <div className="section">
        <div className="subHeading">Parking space :</div>
        <div className="details"> {location.state}</div>
      </div>
      <div className="section">
        <div className="subHeading">Parking Time :</div>
        <div className="details"> {msToTime(totalParkingTime)}</div>
      </div>
      <div className="section">
        <div className="subHeading">Parking Charge :</div>
        <div className="details"> ${parkingCharge}</div>
      </div>
      <div className="section">
        <button
          className="submitButton"
          style={{ backgroundColor: "#0c7ca8", cursor: "pointer" }}
          onClick={handleClosePayment}
        >
          CANCEL
        </button>
        <button
          className="submitButton"
          style={{ backgroundColor: "#0c7ca8", cursor: "pointer" }}
          onClick={paymentGateWay}
        >
          PAYMENT TAKEN
        </button>
      </div>
    </div>
  );
};

export default Payment;
