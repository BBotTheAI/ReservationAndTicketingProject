import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SelectPorts from "./pages/SelectPorts.jsx";
import ReservationInfo from "./pages/ReservationInfo.jsx";
import PnrSearch from "./pages/PnrSearch.jsx";
import UserManagement from "./pages/UserManagement.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/SelectPorts" element={<SelectPorts />} />
        <Route path="/PNRSearch" element={<PnrSearch />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/ReservationInfo" element={<ReservationInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
