import { fireEvent, render, screen } from "@testing-library/react";
import App, { AppContext } from "./App";
import PopUpModal from "./components/PopUpModal";
import appReducer from "./context/AppReducer";
import InputField from "./components/InputField";
import SubmitButton from "./components/SubmitButton";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Payment from "./pages/Payment";
import SlotInput from "./pages/SlotInput";
import ParkingLots from "./pages/ParkingLots";

test("renders learn react link", () => {
  render(<App />);
  const title = screen.getByText(/PARKING LOT MANAGEMENT/i);
  expect(title).toBeInTheDocument();
});

describe("testing the appReducer", () => {
  test("test set slot from appReducer", () => {
    const currentState = { slots: {} };
    const action = {
      type: "SET_SLOT",
      payload: {
        space: "P1",
        data: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const newState = appReducer(currentState, action);
    const expectedState = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

describe("test pop up modal component", () => {
  test("render pop up modal component", () => {
    render(<PopUpModal />);
    screen.debug();
  });

  test("cancel button", () => {
    const mockFunction = jest.fn();
    render(
      <PopUpModal currentSpaceIndex={"P1"} setOpenModalPopMenu={mockFunction} />
    );
    screen.debug();
    const cancelButton = screen.getByText("CANCEL");
    fireEvent.click(cancelButton);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("submit button", () => {
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[{}, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <PopUpModal currentSpaceIndex={"P1"} setOpenModalPopMenu={jest.fn} />,
      { wrapper }
    );
    screen.debug();
    const submitButton = screen.getByText("SUBMIT");
    fireEvent.click(submitButton);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});

describe("test Input field component", () => {
  test("render Input field component", () => {
    const inputProps = {
      placeHolder: "label",
      onChange: jest.fn(),
      type: "text",
    };
    render(<InputField {...inputProps} />);
    screen.debug();
  });

  test("snapshot testing", () => {
    const inputProps = {
      placeHolder: "label",
      onChange: jest.fn(),
      type: "text",
    };
    const { container } = render(<InputField {...inputProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check if on change is called", () => {
    const inputProps = {
      placeHolder: "label",
      onChange: jest.fn(),
      type: "text",
    };
    render(<InputField {...inputProps} />);
    const inputElement = screen.getByDisplayValue("");
    screen.debug();
    fireEvent.change(inputElement, { target: { value: "Redux" } });
    expect(inputProps.onChange).toHaveBeenCalledTimes(1);
  });
});

test("submit button component", () => {
  const mockFunction = jest.fn();
  const wrapper = ({ children }: any) => (
    <AppContext.Provider value={[{}, mockFunction]}>
      {children}
    </AppContext.Provider>
  );
  const submitProps = {
    label: "SUBMIT",
    data: "1",
    to: "/parking-lots",
    buttonCondition: true,
  };
  render(
    <BrowserRouter>
      <SubmitButton {...submitProps} />
    </BrowserRouter>,
    { wrapper }
  );
  screen.debug();
  const submitButton = screen.getByText("SUBMIT");
  fireEvent.click(submitButton);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

test("render Auth component", () => {
  const data = {
    slots: {
      P1: {
        registerNumber: "KA20M3040",
        timeIn: 1659451506175,
        timeOut: 1659459529644,
      },
    },
  };
  const mockFunction = jest.fn();
  const wrapper = ({ children }: any) => (
    <AppContext.Provider value={[data, mockFunction]}>
      {children}
    </AppContext.Provider>
  );
  render(<AuthLayout />, { wrapper });
  screen.debug();
});

test("render slot input page", () => {
  const data = {
    slots: {
      P1: {
        registerNumber: "KA20M3040",
        timeIn: 1659451506175,
        timeOut: 1659459529644,
      },
    },
  };
  const mockFunction = jest.fn();
  const wrapper = ({ children }: any) => (
    <AppContext.Provider value={[data, mockFunction]}>
      {children}
    </AppContext.Provider>
  );
  render(
    <BrowserRouter>
      <SlotInput />
    </BrowserRouter>,
    { wrapper }
  );
  screen.debug();
});

describe("parking lot page", () => {
  test("render parking lots page", () => {
    const data = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[data, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <ParkingLots />
      </BrowserRouter>,
      { wrapper }
    );
    screen.debug();
  });

  test("random button", () => {
    const data = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[data, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <ParkingLots />
      </BrowserRouter>,
      { wrapper }
    );
    screen.debug();
    const submitButton = screen.getByText("ALLOCATE RANDOM SPACE");
    fireEvent.click(submitButton);
  });
});

describe("payemnt page", () => {
  test("render payment page", () => {
    const data = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[data, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <Payment />
      </BrowserRouter>,
      { wrapper }
    );
    screen.debug();
  });

  test("payment taken button", () => {
    const data = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[data, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <Payment />
      </BrowserRouter>,
      { wrapper }
    );
    screen.debug();
    const submitButton = screen.getByText("PAYMENT TAKEN");
    fireEvent.click(submitButton);
  });

  test("cancel button", () => {
    const data = {
      slots: {
        P1: {
          registerNumber: "KA20M3040",
          timeIn: 1659451506175,
          timeOut: 1659459529644,
        },
      },
    };
    const mockFunction = jest.fn();
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={[data, mockFunction]}>
        {children}
      </AppContext.Provider>
    );
    render(
      <BrowserRouter>
        <Payment />
      </BrowserRouter>,
      { wrapper }
    );
    screen.debug();
    const submitButton = screen.getByText("CANCEL");
    fireEvent.click(submitButton);
  });
});
