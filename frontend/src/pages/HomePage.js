// Design a homepage react component that will display the following:
// Logo
// A link to the tasks page
// A link to the auditors page

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

// import menu bar from material ui
import { AppBar, Toolbar, Button } from "@mui/material";
import Login from '../components/Login';

const HomePage = ({isLoggedIn}) => {
    const handleLogout=()=>{
        localStorage.clear();
        window.location.href='/'

    }
    
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="logo" className="App-logo" />
                    <Button size="large" color="inherit" to="/login" onClick={handleLogout}>Logout</Button>
                    <Button size="large" color="inherit" component={Link} to="/lead">Cohort Lead</Button>
                    <Button size="large" color="inherit" component={Link} to="/researcher">Researcher</Button>
                    <Button size="large" color="inherit" component={Link} to="/tickets">Tickets</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};


// const HomePage = () => {
//     return (
//         <div>
//             <img src={logo} alt="logo" />
//             <Link to="/tasks">Tasks</Link>
//             <br />
//             <Link to="/auditors">Auditors</Link>
//         </div>
//     );
// };

export default HomePage;