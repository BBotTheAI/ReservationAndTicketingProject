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

            <button className='button' onClick={() => navigate("/SelectPorts")}>
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
                <label className='radiobutton'>
                  <input type="radio" name="tripType" value="oneway" />
                  One Way
                </label>

                <label>
                  <input type="radio" name="tripType" value="roundtrip" />
                  Round Trip
                </label>
              </div>


              <div className='leftalignedrow'>

                <div className='dropdown'>
                  <p className='zeromargin'>Departure Port</p> 
                  <select className='zeromargin' id="depPort" name="Departure Port">
                    <option value="SAW">SAW</option>
                    <option value="IST">IST</option>
                    <option value="ASD">ASD</option>
                    <option value="ABC">ABC</option>
                  </select>
                </div>

                <div className='dropdown'>
                  <p className='zeromargin'>Arrival Port</p>
                  <select className='zeromargin' id="arrPort" name="Arrival Port">
                    <option value="SAW">SAW</option>
                    <option value="IST">IST</option>
                    <option value="ASD">ASD</option>
                    <option value="ABC">ABC</option>
                  </select>
                </div>


              </div>

              <div>
                <p className='zeromargin'>Departure Date</p>
                <input type="date" id="depDate" name="Departure Date"></input>
              </div>





              <div>
                <div className='count'>
                  Adult Count 
                  <select className='select' id="adlcount" name="Adult Count">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className='count'>
                  Child Count
                  <select className='select' id="childcount" name="Child Count">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>                
                </div>     

                <div className='count'>
                  Infant Count
                  <select className='select' id="infcount" name="Infant Count">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>                
                </div>     



              </div>

              <button className='button-selectports' type='submit'>
                Search
              </button>


            </div>
          </form>

        </div>
        
      
    </>
  )
}

export default SelectPorts
