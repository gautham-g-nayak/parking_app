import React from "react";

export type InputFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  type?: string;
};

export type SubmitButtonProps = {
  data: any;
  to: string;
  buttonCondition: boolean;
  label: string;
};
