import './UserManagement.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function UserManagement() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [usernamedel, setUsernamedel] = useState("");
  const [message, setMessage] = useState("");

  const addUser = async (e) => {
    e.preventDefault();

    if (password !== passwordcheck) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const okMsg = await response.text();
        setMessage(`${okMsg}`);
      } else {
        const errorMsg = await response.text();
        setMessage(`Error: ${errorMsg}`);
      }
    } catch (err) {
      setMessage(`Connection Error: ${err.message}`);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/users/${usernamedel}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const okMsg = await response.text();
        setMessage(`${okMsg}`);
      } else {
        const errorMsg = await response.text();
        setMessage(`Error: ${errorMsg}`);
      }
      
    } catch (err) {
      setMessage(`Connection Error: ${err.message}`);
      
    }

  };

  return (
    <>

    

      <div>
        <div className="menu-usermanagement">

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


      <div className='forms-usermanagement'>
        <form onSubmit={addUser} className='addform-usermanagement'>

          <div className='leftalign-usermanagement'>
            <label htmlFor="username">Username: </label>
            <label htmlFor="password">Password: </label>
            <label htmlFor="password2">Password (Again): </label>
          </div>

          <div className='rightalign-usermanagement'>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              id="passwordcheck"
              type="password"
              value={passwordcheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />

            <button type='submit'>
              ADD USER
            </button>
          </div>



        </form>
      

        <form onSubmit={deleteUser} className='deleteform-usermanagement'>

          <div className='leftalign-usermanagement'>
            <label htmlFor="usernamedel">Username: </label>
          </div>

          <div className='rightalign-usermanagement'>
            <input
              id="usernamedel"
              type="text"
              value={usernamedel}
              onChange={(e) => setUsernamedel(e.target.value)}
            />


            <button type='submit'>
              DELETE USER
            </button>
          </div>


        </form>

        <p>{message}</p>

      </div>

      
      
    
    </>
  )
}

export default UserManagement
