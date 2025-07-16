import { useState } from 'react'
import hititLogo from '../assets/hit_logo_original.png'
import './Login.css'
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/SelectPorts")
      } else {
        const errorMsg = await response.text();
        setMessage(`Hata: ${errorMsg}`);
      }
    } catch (err) {
      setMessage(`Bağlantı hatası: ${err.message}`);
    }
  };

  return (
    <>
    
      <div>
          <img src={hititLogo} className="logo react" alt="React logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="loginInfo-login">
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit'>
            Login
          </button>

        </div>
      </form>

      <p>{message}</p>
      
    </>
  )
}

export default Login
