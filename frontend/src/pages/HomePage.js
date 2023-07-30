// Design a homepage react component that will display the following:
// Logo
// A link to the tasks page
// A link to the auditors page

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

// import menu bar from material ui
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const HomePage = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <img src={logo} alt="logo" />
                    </Typography>
                    <Button color="inherit" component={Link} to="/psds">Cohort Lead</Button>
                    <Button color="inherit" component={Link} to="/researcher">Researcher</Button>
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