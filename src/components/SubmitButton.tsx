import { useNavigate } from "react-router-dom";
import "./SubmitButton.css";
import { SubmitButtonProps } from "../types";
import { actions } from "../actions";
import { AppContext } from "../App";
import { useContext } from "react";

const SubmitButton = ({
  label,
  data,
  to,
  buttonCondition = true,
}: SubmitButtonProps) => {
  const { setSlot } = actions;
  const [appData, dispatchAppData] = useContext(AppContext);
  const navigate = useNavigate();

  const submitHandler = () => {
    const lots = Array.from({ length: +data }, (v, i) => `P${i + 1}`);
    lots.forEach((lot) => {
      dispatchAppData(setSlot(lot, "", 0, 0));
    });
    navigate(to);
  };

  return (
    <button
      onClick={submitHandler}
      className="submitButton"
      style={{
        pointerEvents: buttonCondition ? "auto" : "none",
        backgroundColor: buttonCondition ? "var(--mainColor)" : "#babfc4",
      }}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
