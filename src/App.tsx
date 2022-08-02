import React, { useReducer } from "react";
import appReducer from "./context/AppReducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ParkingLots from "./pages/ParkingLots";
import Payment from "./pages/Payment";
import SlotInput from "./pages/SlotInput";

const initContextData = { slots: {} };
const AppContext: any = React.createContext([]);

function App() {
  const [appData, dispatchAppData] = useReducer<any>(
    appReducer,
    initContextData
  );

  return (
    <AppContext.Provider value={[appData, dispatchAppData]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SlotInput />} />
          <Route path="/parking-lots" element={<ParkingLots />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
export { AppContext };
