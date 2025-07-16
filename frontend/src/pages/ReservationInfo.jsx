import './ReservationInfo.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

function ReservationInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pnrNO = state?.searchPNR || 1;
  const [message, setMessage] = useState("");
  const [reservation, setReservation] = useState("null");
  const [flight, setFlight] = useState("null");
  

  useEffect(() => {
    const fetchReservation = async () => {
      

      try {
        const res = await fetch(`http://localhost:8080/reservation/${pnrNO}`);
        if (res.ok) {
          const resData = await res.json();
          setReservation(resData);

        } else {
          setMessage("Reservation not found.");
        }
      } catch (err) {
        setMessage(`Connection error: ${err.message}`);
      }

    };

    fetchReservation();
  }, [pnrNO]);

  useEffect(() => {
    
    const fetchFlight = async () => {
      try {
        const fly = await fetch(`http://localhost:8080/searchflightno/${pnrNO}`);
        if (fly.ok) {
          const flyData = await fly.json();
          setFlight(flyData);
        }else {
          setMessage("Flight not found.");
        }

      } catch (err) {
        setMessage(`Connection error: ${err.message}`);
      }
    }

    fetchFlight();
  }, [pnrNO]);

  

  const rawbDayDate = reservation.bday;
  const newbDayDate = new Date(rawbDayDate);
  const normalBDay = newbDayDate.toLocaleDateString();

  const rawFlightDate = flight.date;
  const newFlightDate = new Date(rawFlightDate);
  const normalFlightDate = newFlightDate.toLocaleDateString();
  const normalFlightTime = newFlightDate.toLocaleTimeString(
    'tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(':', '.');


  const cancelRes = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/cancelRes/${pnrNO}`, {
        method: "POST",
      });

      if (response.ok) {
        const okMsg = await response.text();
        setMessage(`${okMsg}`); 
      }else {
        const errorMsg = await response.text();
        setMessage(`Error: ${errorMsg}`);
      }

    } catch (err) {
      setMessage(`Connection Error: ${err.message}`);
    }

  }

  return (
    <>
        <div>
          <div className="menu-reservationinfo">

            <button onClick={() => navigate("/ReservationInfo")}>
              Reservation
            </button>

            <button onClick={() => navigate("/PNRSearch")}>
              PNR Search
            </button>

            <button onClick={() => navigate("/UserManagement")}>
              User Management
            </button>
            
          </div>
        </div>
        

        <form className='page-res-pnr' onSubmit={cancelRes}>

          <div className='pnr-res'>
            <p>PNR NO : {pnrNO}</p>
          </div>

          <div>
            <div className='tablo-res'>
              <div className='tablo-res-inner'>
                <p>Passenger Info</p>
              </div>
              <div className='info-res'>
                <div className='yardimedin'>
                  <p className='text-res'> {reservation.name} {reservation.surname} </p>
                  <p className='text-res'> {normalBDay}</p>
                  <p className='text-res'> {reservation.gender} </p>
                </div>           
              </div>
            </div>
            
            <div className='tablo-res'>
              <div className='tablo-res-inner'>
                <p>Fligth Info</p>
              </div>
              <div className='info-res'>
                <div className='yardimedin'>
                  <p className='text-res'> {flight?.id?.flightno}</p>
                  <p className='text-res'> {normalFlightDate} {normalFlightTime}</p>
                  <p className='text-res'> {flight.departureport} - {flight.arrivalport} </p>
                </div>            
              </div>
            </div>
          </div>

          <div className='container-res-pnr-button'>
            <button className='button-res-pnr' type='submit'>CANCEL RESERVATION</button>
          </div>
          
          <p>{message}</p>

        </form>
      
    </>
  )
}

export default ReservationInfo
