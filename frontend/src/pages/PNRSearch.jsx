import { useState } from 'react';
import './PNRSearch.css'
import { useNavigate } from "react-router-dom";

function PNRSearch() {
  //navigate("/reservation", { state: { pnrNO } });
//pnr numarasını res info sayfasına gönderecek
  const navigate = useNavigate();
  const [pnrNO, setPNR] = useState(""); 

  const search = async (e) => {
    e.preventDefault();

    navigate("/ReservationInfo", { state: { pnrNO } });
  };

  return (
    <>

        <div>
          <div className="menu-PNRSearch">

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




        <form onSubmit={search} className='container-pnrsearch'>
          <label htmlFor="pnrNO">PNR NO : </label>
          <input
            id="pnrNO"
            type="text"
            value={pnrNO}
            onChange={(e) => setPNR(e.target.value)}
          />
          <button className='button-pnrsearch' type='submit'>
            Search
          </button>
        </form>




    </>
  )
}

export default PNRSearch
