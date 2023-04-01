import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";
import { useEffect, useRef, useState } from "react";

export const Nav = () => {
  const lastScrollTop = useRef(0);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        var { pageYOffset } = window;
        if (pageYOffset > lastScrollTop.current) {
          // downward scroll
          setIsNavbarVisible(false);
        } else if (pageYOffset < lastScrollTop.current) {
          // upward scroll
          setIsNavbarVisible(true);
        } // else was horizontal scroll
        lastScrollTop.current = pageYOffset <= 0 ? 0 : pageYOffset;
      },
      { passive: true }
    );
  }, []);

  const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logo = require("../../images/logo.PNG")
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <nav className={`${isNavbarVisible ? "visible" : ""}`}>
            <img alt={logo} className='logo' src={logo}/>
            {
                auth ? <ul className='nav-ul'>
                    <li><Link to='/'>Product</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link onClick={logout} to='/signup'>Logout</Link></li>
                </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }
        </nav>
    );
};

export default Nav;