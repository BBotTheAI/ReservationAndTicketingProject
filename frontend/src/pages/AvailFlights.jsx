import "./AvailFlights.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
 
function AvailFlights() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const flights = state?.flights || [];
 
  const [selectedFlightNo, setSelectedFlightNo] = useState("");
  const [selectedCabin, setSelectedCabin] = useState("");
 
  const handleContinue = () => {
    if (!selectedFlightNo || !selectedCabin) {
      alert("Lütfen uçuş ve kabin tipi seçin.");
      return;
    }
 
    console.log("Seçilen uçuş:", selectedFlightNo);
    console.log("Seçilen kabin:", selectedCabin);
 
  };

  const flightPackage = [];
  
  useEffect(() => {
    const checkFlightNo = () => {
      for (var i = 0; i < flights; i++) {
        for (var j = 0; j < flights; j++) {
          if (flights[i].flightno == flights[i].flightno){
            flightPackage.push([flights[i], flights[i]])
          }
        }
      }


    }
  checkFlightNo();
    
  }, [flightPackage, flights]);




 
  return (
    <>
      <div className="menu-availflights">
        <button className="button" onClick={() => navigate("/SelectPorts")}>Reservation</button>
        <button className="button" onClick={() => navigate("/PNRSearch")}>PNR Search</button>
        <button className="button" onClick={() => navigate("/UserManagement")}>User Management</button>
      </div>
 
      <div className="flights-list">
        {flightPackage.map((flight, index) => (
          <div key={index} className="flight-box">
            <p><b>{flight.flightno}</b></p>
            <p>Cabin: {flight.cabin}</p>
            <p>Fiyat: {flight.price} USD</p>
            <label>
              <input
                type="radio"
                name="selectedFlight"
                value={`${flight.flightno}-${flight.cabin}`}
                onChange={() => {
                  setSelectedFlightNo(flight.flightno);
                  setSelectedCabin(flight.cabin);
                }}
                checked={selectedFlightNo === flight.flightno && selectedCabin === flight.cabin}
              />
              Seç
            </label>
          </div>
        ))}
      </div>
 
      <button className="continue" onClick={handleContinue}>CONTINUE</button>
    </>
  );
}
 
export default AvailFlights;