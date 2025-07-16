import { useState } from 'react';
import './PNRSearch.css'
import { useNavigate } from "react-router-dom";

function PNRSearch() {
  //navigate("/reservation", { state: { pnrNO } });
//pnr numarasını res info sayfasına gönderecek
  const navigate = useNavigate();
  const [searchPNR, setsearchPNR] = useState(""); 

  const search = async (e) => {
    e.preventDefault();

    navigate("/ReservationInfo", { state: { searchPNR } });
  };

  return (
    <>

        <div>
          <div className="menu-PNRSearch">

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




        <form onSubmit={search} className='container-pnrsearch'>
          <label htmlFor="searchPNR">PNR NO : </label>
          <input
            id="searchPNR"
            type="text"
            value={searchPNR}
            onChange={(e) => setsearchPNR(e.target.value)}
          />
          <button className='button-pnrsearch' type='submit'>
            Search
          </button>
        </form>




    </>
  )
}

export default PNRSearch
