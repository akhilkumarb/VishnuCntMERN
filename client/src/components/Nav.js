import React from "react";
import "./Nav.css";
import { useAuth } from "./AuthProvider.js";
import {Link} from "react-router-dom";
export default function Nav() {
  const { LogoutAuth } = useAuth(); 
  return (
    <aside className="navBar">
      <nav className="nav">
        <ul>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/home">
              <i class="fa-solid fa-house"></i>Home
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/home/myposts">
              <i class="fa-solid fa-blog"></i>My Posts
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/home/likedtweets">
              <i class="fa-brands fa-gratipay"></i>Liked Tweets
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              <i class="fa-solid fa-bell"></i>Notification
            </a>
          </li>

          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/home/bookmark">
              <i class="fa-solid fa-bookmark"></i>Bookmarks
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/home/myprofile">
              <i class="fa-solid fa-user"></i>Myprofile
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              <i class="fa-solid fa-angles-right"></i>More
            </a>
          </li>
          <li className="Logout">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              style={{ background: "#b74e56", height:"40px" }}
              href="#"
              onClick={LogoutAuth}
            >
              <i class="fa-solid fa-right-from-bracket"></i>Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
