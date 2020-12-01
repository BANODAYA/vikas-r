import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Landing from "../components/layout/Landing"

//import {logoutUser} from "../../../actions/authActions";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'><li className='nav-item'>
              {/* <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Adeborna Rentals
              </Link> */}
            </li> 
           <Link to='/' className='navbar-logo' onClick={handleClick}>
            Adeborna Rentals
            <i class='fab fa-typo3' />
          </Link> 
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className='nav-item'> 
              <Link
                to='/cal1'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                cal1
              </Link>
            </li>  
             <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                cal2
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               cal3
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal4'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                cal4
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={Landing}
              >
                Logout
              
              </Link>
            </li>
           
          </ul>
          {button && <Button buttonStyle='btn--outline'>Logout</Button>}
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;