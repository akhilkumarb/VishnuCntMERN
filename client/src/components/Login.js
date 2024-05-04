import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { LoginAuth } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API+"/login", data);
      if (res) {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
       
        

        LoginAuth();
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Error sending request");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>

        <Link to="/Register">Do Not Have An Account!</Link>
      </form>
    </div>
  );
}
