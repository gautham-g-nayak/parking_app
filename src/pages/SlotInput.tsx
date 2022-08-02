import React, { useState } from "react";
import "./SlotInput.css";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

function SlotInput() {
  const [parkingLot, setParkingLot] = useState("");
  const [buttonCondition, setButtonCondition] = useState(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParkingLot(e.target.value);
    Number(e.target.value)
      ? setButtonCondition(true)
      : setButtonCondition(false);
  };

  return (
    <div className="background">
      <div className="title">PARKING LOT MANAGEMENT</div>
      <div className="inputContainer">
        <InputField
          placeHolder="Enter number of parking spaces"
          onChange={inputHandler}
          type="number"
        />
        <SubmitButton
          to={`/parking-lots`}
          data={parkingLot}
          buttonCondition={buttonCondition}
          label="SUBMIT"
        />
      </div>
    </div>
  );
}

export default SlotInput;
