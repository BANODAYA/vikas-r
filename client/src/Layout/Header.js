import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Landing from "../components/layout/Landing"
import Register from "../components/auth/Register"
import Rc from "../components/Calulators/RentalCalculator";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import Rc from "../../../Backend/rentalcalculator";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { rentalCalculator } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [temp, setTemp] = useState();

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

//   componentDidMount() {
//     // If logged in and user navigates to Login page, should redirect them to dashboard
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push("/rentalCalculator");
//     }
//   }

// componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/rentalCalculator"); // push user to dashboard when they login
//     }
// if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

// onChange = e => {
//     this.setState({[e.target.id]: e.target.value});
// };
// onSubmit = e => {
//     e.preventDefault();

     
    
//     this.props.loginUser(userData);
// };

  const openTemp = async() => {
    console.log("open temp")
    Axios({
      method: "GET",
      url: "http://localhost:5000/api/users/rentalCalculator",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
    });
    // const res = await axios.get('http://localhost:5000/api/users/rentalCalulator');
    // console.log(Rc);
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
  <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu} ></MenuIcon>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rental Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Rehab Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Fix N Flip Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Whole Failing Calculator</MenuItem>
      </Menu>
    </IconButton>
    <Typography variant="h6" className={classes.title}>
     Adeborna Rentals
    </Typography>
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className='nav-item'  onClick={handleClick}> 
              <Link
                to='/Rc'
                className='nav-links'
                onClick={openTemp}
              >
                RentalCalculator
              </Link>
            </li>  
             <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rehab Calculator
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Fix N Flip Calculator
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal4'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Whole Failing Calculator
              </Link>
            </li>
            <li>
            <Link
                to='/sign-up'
                className='nav-links'
                onClick={Landing}
              >
                Sign Up
              </Link>
            </li>
              
            
          </ul>
  </Toolbar>
  </AppBar>
    </>
  );
}

export default Navbar;


// Navbar.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { rentalCalculator }
// )(Navbar);
