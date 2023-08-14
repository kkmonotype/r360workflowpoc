import React, {  useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';

const Login = () => {
   const [isLoggedIn, setisLoggedIn] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[userData,setUserData]=useState({})


const handleLogin = async (event) => {
     event.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/users/david.kegelmayer@monotype.com`);
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
 
    setUserData(data);
     localStorage.setItem('loggedIn', "true");
     localStorage.setItem('username', username);
    localStorage.setItem('userdata', userData);
     window.location.href='/home';
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error);
    }
  };
  


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
