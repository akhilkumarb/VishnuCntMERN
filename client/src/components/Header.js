import React from "react";
import { useAuth } from "./AuthProvider.js";
 import "./Header.css";


export default function Header() {
     const { LogoutAuth } = useAuth(); 
  return (
    <header>
      <div className="header-text">
        <h1>VishnuCnt</h1>
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={LogoutAuth}>
        <i class="fa-solid fa-right-from-bracket"></i>Logout
      </a>
    </header>
  );
}
