import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileUrl: " ",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { name, email, password, profileUrl } = data;
      const response = await axios.post("http://localhost:5000/register", {
        register_Name: name,
        register_email: email,
        register_password: password,
        profileUrl: profileUrl,
      });
      alert(response.data);
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
      <form onSubmit={handleSubmit} className="login">
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="ConfirmPassword"
          required
        />

        <input
          type="text"
          id="profileUrl"
          name="profileUrl"
          value={data.profileUrl}
          onChange={handleChange}
          placeholder="ProfileUrl"
          required
        />
        <button type="submit">Register</button>

        <Link to="/login">Already have an acc!</Link>
      </form>
    </div>
  );
}
