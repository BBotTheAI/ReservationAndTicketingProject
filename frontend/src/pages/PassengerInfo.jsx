import "./PassengerInfo.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function PassengerInfo() {
    const navigate = useNavigate();
    const [passportno, setPassportno] = useState("");
    const [nationalityno, setNationalityNo] = useState("");
    const [telno, setTelNo] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const { state } = useLocation();
    const departureFlight = state?.departureFlight;
    const returnFlight = state?.returnFlight;

    const departureflightno = departureFlight?.flightno;
    const departurecabin = departureFlight?.cabin;
    const arrivalflightno = returnFlight?.flightno;
    const arrivalcabin = returnFlight?.cabin;







    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/createres", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, passportno, nationalityno, telno, email }),
            });

            const newres = await response.text();
            const pnr = parseInt(newres);

            if (response.ok && !isNaN(pnr)) {
                const rel1 = await fetch("http://localhost:8080/createresflightrel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    pnr,
                    flightno: departureflightno,
                    cabin: departurecabin
                    }),
                });

                


                if (returnFlight) {
                    const rel2 = await fetch("http://localhost:8080/createreturnresflightrel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pnr,
                        flightno: arrivalflightno,
                        cabin: arrivalcabin
                    }),
                    });

                    console.log("RETURN FLIGHT REL:", {
                    pnr,
                    flightno: arrivalflightno,
                    cabin: arrivalcabin
                    });

                }

                navigate("/Payment", { state: { pnr } });
            } else {
            alert("Rezervasyon oluşturulamadı: " + newres);
            }
        } catch (err) {
            alert(`Bağlantı hatası: ${err.message}`);
        }
    };


    return (
        <>
            <div className="container-PassengerInfo">
                <div className="menu-PassengerInfo">
                    <button className="button" onClick={() => navigate("/SelectPorts")}>
                        Reservation
                    </button>

                    <button className="button" onClick={() => navigate("/PNRSearch")}>
                        PNR Search
                    </button>

                    <button
                        className="button"
                        onClick={() => navigate("/UserManagement")}
                    >
                        User Management
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="container-PassengerInfo">

                    <div className="loginInfo-PassengerInfo">

                        <div className="leftalignedcolumn-PassengerInfo">

                            <div>
                                <label htmlFor="name">Name: </label>
                                <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="surname">Surname: </label>
                                <input
                                id="surname"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            

                            <div>
                                <p className="zeromargin-PassengerInfo">Birth Date : </p>
                                <input type="date" id="bdate" name="Birth Date"></input>
                            </div>

                            <div className="dropdown-PassengerInfo">
                                
                                <p className="zeromargin-PassengerInfo">Gender : </p>
                                
                                <select
                                    className="zeromargin-PassengerInfo"
                                    id="gender"
                                    name="Gender"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>


                        </div>
                        
                    </div>



                    <div className="loginInfo2-PassengerInfo">

                        <div className="leftalignedcolumn-PassengerInfo">

                            <div>
                                <label htmlFor="passportno" className="zeromargin-PassengerInfo">
                                    Passport No:{" "}
                                </label>
                                <input
                                    id="passportno"
                                    type="text"
                                    value={passportno}
                                    onChange={(e) => setPassportno(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="nationalityno" className="zeromargin-PassengerInfo">
                                    Nationality No:{" "}
                                </label>
                                <input
                                    id="nationalityno"
                                    type="text"
                                    value={nationalityno}
                                    onChange={(e) => setNationalityNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="telno" className="zeromargin-PassengerInfo">
                                    Tel No :{" "}
                                </label>
                                <input
                                    id="telno"
                                    type="text"
                                    value={telno}
                                    onChange={(e) => setTelNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="zeromargin-PassengerInfo">
                                    Email:{" "}
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button className="button-selectports-PassengerInfo" type="submit">
                                Create Reservation
                            </button>
                        </div>

                    </div>



                    
                </form>
            </div>
        </>
    );
}

export default PassengerInfo;
