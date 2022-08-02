import { Link } from "react-router-dom";
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

  const submitHandler = () => {
    const lots = Array.from({ length: +data }, (v, i) => `P${i + 1}`);
    lots.forEach((lot) => {
      dispatchAppData(setSlot(lot, "", 0, 0));
    });
  };

  return (
    <Link
      to={to}
      onClick={submitHandler}
      className="submitButton"
      style={{
        pointerEvents: buttonCondition ? "auto" : "none",
        backgroundColor: buttonCondition ? "var(--mainColor)" : "#babfc4",
      }}
    >
      {label}
    </Link>
  );
};

export default SubmitButton;
