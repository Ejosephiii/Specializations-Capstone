import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import InstaNav from "../InstaNav/InstaNav";

function Register() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const authenticate = (e) => {
    e.preventDefault();
    console.log("endpoint hit");
    axios
      .post("http://localhost:3001/api/users", { username, password, login })
      .then(() => navigate("/home"))
      .catch((err) => alert(err.response.data));
  };
  return (
    <div className="register-div">
      <div className="header">
        <InstaNav />
      </div>

      <div className="register">
        {login ? (
          <div>
            <button className="login" onClick={() => setLogin(!login)}>
              Register
            </button>
            <h3> Login</h3>
          </div>
        ) : (
          <div>
            <button className="login" onClick={() => setLogin(!login)}>
              Login
            </button>
            <h3> Register</h3>
          </div>
        )}

        {login ? (
          <form onSubmit={(e) => authenticate(e)}>
            <input
              className="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="submit-div">
              <button className="submit">Submit</button>
            </div>
          </form>
        ) : (
          <form onSubmit={(e) => authenticate(e)}>
            <input
              className="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="submit-div">
              <button className="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
