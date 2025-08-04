import './SelectPorts.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function SelectPorts() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [depPort, setDepPort] = useState("SAW");
  const [arrPort, setArrPort] = useState("IST");
  const [depDate, setDepDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adlCount, setAdlCount] = useState("1");
  const [childCount, setChildCount] = useState("0");
  const [infCount, setInfCount] = useState("0");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tripType === "roundtrip") {
      if (!returnDate) {
        alert("Lütfen dönüş tarihini girin.");
        return;
      }

      const dep = new Date(depDate);
      const ret = new Date(returnDate);

      if (ret <= dep) {
        alert("Dönüş tarihi, gidiş tarihinden sonra olmalıdır.");
        return;
      }
    }

    const payload = {
      departureport: depPort,
      arrivalport: arrPort,
      date: depDate
    };

    const returnPayload = {
      departureport: arrPort,
      arrivalport: depPort,
      date: returnDate
    };

    try {
      const res = await fetch("http://localhost:8080/flight/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let returnFlights = [];

      if (tripType === "roundtrip") {
        const returnRes = await fetch("http://localhost:8080/flight/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(returnPayload),
        });

        if (returnRes.ok) {
          returnFlights = await returnRes.json();
        }
      }

      if (res.ok) {
        const flights = await res.json();

        if (flights.length > 0) {
          navigate("/AvailFlights", {
            state: {
              flights,
              returnFlights,
              tripType,
              depDate,
              returnDate
            },
          });
        } else {
          alert("Uygun uçuş bulunamadı.");
        }
      } else {
        alert("Arama başarısız oldu.");
      }
    } catch (err) {
      alert("Bağlantı hatası: " + err.message);
    }
  };

  return (
    <div className='container-selectports'>
      <div className="menu-selectports">
        <button className='button' onClick={() => navigate("/SelectPorts")}>Reservation</button>
        <button className='button' onClick={() => navigate("/PNRSearch")}>PNR Search</button>
        <button className='button' onClick={() => navigate("/UserManagement")}>User Management</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="loginInfo-selectports">
          <div>
            <label>
              <input type="radio" name="tripType" value="oneway"
                checked={tripType === "oneway"}
                onChange={(e) => setTripType(e.target.value)} />
              One Way
            </label>
            <label>
              <input type="radio" name="tripType" value="roundtrip"
                checked={tripType === "roundtrip"}
                onChange={(e) => setTripType(e.target.value)} />
              Round Trip
            </label>
          </div>

          <div className='leftalignedrow'>
            <div className='dropdown'>
              <p className='zeromargin'>Departure Port</p>
              <select value={depPort} onChange={(e) => setDepPort(e.target.value)}>
                <option value="SAW">SAW</option>
                <option value="IST">IST</option>
                <option value="ASD">ASD</option>
                <option value="ABC">ABC</option>
              </select>
            </div>

            <div className='dropdown'>
              <p className='zeromargin'>Arrival Port</p>
              <select value={arrPort} onChange={(e) => setArrPort(e.target.value)}>
                <option value="IST">IST</option>
                <option value="SAW">SAW</option>
                <option value="ASD">ASD</option>
                <option value="ABC">ABC</option>
              </select>
            </div>
          </div>

          <div>
            <p className='zeromargin'>Departure Date</p>
            <input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} />
          </div>

          {tripType === "roundtrip" && (
            <div>
              <p className='zeromargin'>Return Date</p>
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </div>
          )}

          <div>
            <div className='count'>
              Adult Count
              <select value={adlCount} onChange={(e) => setAdlCount(e.target.value)}>
                <option value="1">1</option><option value="2">2</option>
                <option value="3">3</option><option value="4">4</option>
              </select>
            </div>

            <div className='count'>
              Child Count
              <select value={childCount} onChange={(e) => setChildCount(e.target.value)}>
                <option value="0">0</option><option value="1">1</option>
                <option value="2">2</option><option value="3">3</option>
              </select>
            </div>

            <div className='count'>
              Infant Count
              <select value={infCount} onChange={(e) => setInfCount(e.target.value)}>
                <option value="0">0</option><option value="1">1</option>
                <option value="2">2</option><option value="3">3</option>
              </select>
            </div>
          </div>

          <button className='button-selectports' type='submit'>Search</button>
        </div>
      </form>
    </div>
  );
}

export default SelectPorts;
