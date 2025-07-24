import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SelectPorts from "./pages/SelectPorts.jsx";
import ReservationInfo from "./pages/ReservationInfo.jsx";
import PnrSearch from "./pages/PnrSearch.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import AvailFlights from "./pages/AvailFlights.jsx";
import Payment from "./pages/Payment.jsx";
import PassengerInfo from "./pages/PassengerInfo.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/SelectPorts" element={<SelectPorts />} />
        <Route path="/PNRSearch" element={<PnrSearch />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/ReservationInfo" element={<ReservationInfo />} />
        <Route path="/AvailFlights" element={<AvailFlights />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/PassengerInfo" element={<PassengerInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
