import React, {  useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
// import { useNavigate,Navigate } from 'react-router-dom';


const Login = () => {
   // const [isLoggedIn, setisLoggedIn] = useState(false);
//    const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


const handleLogin = async (event) => {
    event.preventDefault();
    try {
    //   const response = await fetch('http://localhost:4000/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message);
    //   }
      //setisLoggedIn(true)
      localStorage.setItem('loggedIn', "true");
      window.location.href='/home'
      localStorage.setItem('username', username);

      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error);
    }
  };

//   useEffect(()=>{
//     const loggedIn=localStorage.getItem('loggedIn')
 
//     if(loggedIn==='true'){
//         navigate('/');
//     }else{
//         navigate('/login');
//     }

//   },[navigate])


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
