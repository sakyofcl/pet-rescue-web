import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = ()=>{
    const {isLogin, logout} = useAuth();
    
    return (
        <header className="header_section long_section px-0">
        <nav className="navbar navbar-expand-lg custom_nav-container ">
          <NavLink className="navbar-brand" to="/">
            <span>
            Springfield Pet Rescue
            </span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""> </span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pets">Pets</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/guides">Guides</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/inform">Inform</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/event">Events</NavLink>
                </li>
                
              </ul>
            </div>
            <div className="quote_btn-container">
              {
                isLogin() ? (
                  <>
                    <button className="btn nav-link" onClick={()=> logout()}> LOGOUT </button>
                    <NavLink className="nav-link" to="/profile"> Profile </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="nav-link" to="/login"> Login </NavLink>
                    <NavLink className="nav-link" to="/register"> Register </NavLink>
                  </>
                )
              }

            </div>
          </div>
        </nav>
      </header>
    );
}