import "./InputField.css";
import { InputFieldProps } from "../types";

const InputField = ({
  onChange,
  placeHolder,
  type = "text",
}: InputFieldProps) => {
  return (
    <input
      className="inputField"
      placeholder={placeHolder}
      type={type}
      onChange={onChange}
      min="1"
    />
  );
};

export default InputField;
