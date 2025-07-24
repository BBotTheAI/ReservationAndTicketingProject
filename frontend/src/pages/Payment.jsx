import './Payment.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pnrNO = state?.searchPNR || state?.pnr || 1;
  console.log(pnrNO)
  const [message, setMessage] = useState("");
  const [reservation, setReservation] = useState("null");
  const [flight, setFlight] = useState("null");
  const [selectedPayment, setSelectedPayment] = useState('')

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


  const finishPayment = async (e) => {
    e.preventDefault();


    if(!selectedPayment) {
        setMessage('Please choose')
        return;
    } else {
        try {
        const response = await fetch(`http://localhost:8080/makepayment/${pnrNO}`, {
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

        navigate("/ReservationInfo", { state: { pnrNO } });

    }


  }

  return (
    <>
        <div>
          <div className="menu-reservationinfo">

            <button onClick={() => navigate("/SelectPorts")}>
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
        

        <form className='page-pay-pnr' onSubmit={finishPayment}>

            <div>
                <div className='pnr-pay'>
                    <p>PNR NO : {pnrNO}</p>
                </div>

                <div>
                    <div className='tablo-pay'>
                    <div className='tablo-pay-inner'>
                        <p>Passenger Info</p>
                    </div>
                    <div className='info-pay'>
                        <div className='yardimedin-pay'>
                        <p className='text-pay'> {reservation.name} {reservation.surname} </p>
                        <p className='text-pay'> {normalBDay}</p>
                        <p className='text-pay'> {reservation.gender} </p>
                        </div>           
                    </div>
                    </div>
                    
                    <div className='tablo-pay'>
                    <div className='tablo-pay-inner'>
                        <p>Fligth Info</p>
                    </div>
                    <div className='info-pay'>
                        <div className='yardimedin'>
                        <p className='text-pay'> {flight?.id?.flightno}</p>
                        <p className='text-pay'> {normalFlightDate} {normalFlightTime}</p>
                        <p className='text-pay'> {flight.departureport} - {flight.arrivalport} </p>
                        </div>            
                    </div>
                    </div>
                </div>

            </div>

          <div className='paymentdiv'>

            <p>
                Total Payment : {flight.price} USD
            </p>

            <label className='option-pay'>
                <input
                    type="radio"
                    name="cabin"
                    value="CASH"
                    checked={selectedPayment === 'CASH'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                />
                CASH
            </label>


            <div className='container-pay-pnr-button'>
                <button className='button-pay-pnr' type='submit'>OK</button>
            </div>

          </div>

          

        </form>

        <p className='message-pay'>{message}</p>
      
    </>
  )
}

export default Payment
