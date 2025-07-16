import './SelectPorts.css'
import { useNavigate } from "react-router-dom";

function SelectPorts() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  };


  return (
    <>
        <div className='container-selectports'>

          <div className="menu-selectports">

            <button className='button' onClick={() => navigate("/ReservationInfo")}>
              Reservation
            </button>

            <button className='button' onClick={() => navigate("/PNRSearch")}>
              PNR Search
            </button>

            <button className='button' onClick={() => navigate("/UserManagement")}>
              User Management
            </button>
            
          </div>


          <form onSubmit={handleSubmit}>

            <div className="loginInfo-selectports">
              <div>
                <label>
                  <input type="radio" name="tripType" value="oneway" />
                  One Way
                </label>

                <label>
                  <input type="radio" name="tripType" value="roundtrip" />
                  Round Trip
                </label>
              </div>

              <button type='submit'>
                Search
              </button>

            </div>
          </form>

        </div>
        
      
    </>
  )
}

export default SelectPorts
