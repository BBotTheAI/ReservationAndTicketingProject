import './AvailFlights.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function AvailFlights() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flights = state?.flights || [];
  const returnFlights = state?.returnFlights || [];
  const tripType = state?.tripType || "oneway";

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleContinue = () => {
    if (!selectedDeparture || (tripType === "roundtrip" && !selectedReturn)) {
      alert("Lütfen tüm gerekli uçuş seçimlerini yapın.");
      return;
    }

    navigate("/PassengerInfo", {
      state: {
        departureFlight: {
          flightno: selectedDeparture.id.flightno,
          cabin: selectedDeparture.id.cabin
        },
        returnFlight: tripType === "roundtrip" && selectedReturn
          ? {
              flightno: selectedReturn.id.flightno,
              cabin: selectedReturn.id.cabin
            }
          : null,
        tripType: tripType
      }
    });

  };


  return (
    <div className="container-avail">
      <div className="menu-selectports">
        <button className='button' onClick={() => navigate("/SelectPorts")}>Reservation</button>
        <button className='button' onClick={() => navigate("/PNRSearch")}>PNR Search</button>
        <button className='button' onClick={() => navigate("/UserManagement")}>User Management</button>
      </div>

      <div className="section-avail">
        <h2 className="title-avail">Departure Flights</h2>
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className={`card-avail ${flight.id.cabin === "ECONOMY" ? "economy-bg" : ""} ${flight.id.cabin === "BUSINESS" ? "business-bg" : ""}`}>
              <input
                type="radio"
                name="departureFlight"
                onChange={() => setSelectedDeparture(flight)}
              />
              <div className="info-avail">
                <p><strong>Flight No:</strong> {flight.id.flightno}</p>
                <p><strong>Cabin:</strong> {flight.id.cabin}</p>
                <p><strong>Price:</strong> {flight.price}₺</p>
              </div>
            </div>
          ))
        ) : (
          <p>No departure flights found.</p>
        )}
      </div>

      {tripType === "roundtrip" && (
        <div className="section-avail">
          <h2 className="title-avail">Return Flights</h2>
          {returnFlights.length > 0 ? (
            returnFlights.map((flight, index) => (
              <div key={index} className={`card-avail ${flight.id.cabin === "ECONOMY" ? "economy-bg" : ""} ${flight.id.cabin === "BUSINESS" ? "business-bg" : ""}`} >
                <input
                  type="radio"
                  name="returnFlight"
                  onChange={() => setSelectedReturn(flight)}
                />
                <div className="info-avail">
                  <p><strong>Flight No:</strong> {flight.id.flightno}</p>
                  <p><strong>Cabin:</strong> {flight.id.cabin}</p>
                  <p><strong>Price:</strong> {flight.price}₺</p>
                </div>
              </div>
            ))
          ) : (
            <p>No return flights found.</p>
          )}
        </div>
      )}

      <button className="continue-avail" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}

export default AvailFlights;
