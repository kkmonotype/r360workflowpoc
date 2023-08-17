import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomTable = ({ data }) => {

  const [status,setStatus]=useState("");
  const[userData,setUserData]=useState({});
  const [scuccess,setScuccess]=useState("");


  async function fetchUserInfo() {

    const response = await fetch(`http://localhost:4000/api/users/david.kegelmayer@monotype.com`);
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
    setUserData(data);
  
    }
    useEffect(() => {
      fetchUserInfo();
    }, []); 
    const handleStatus=async(Research_PK,status)=>{
      console.log(Research_PK,status,"6666")
      const response = await fetch(`http://localhost:4000/api/tickets/${Research_PK}/status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Ticket_Status": status,
          "Employee_ID": userData.User_ID
      }),
    
    });
    const data = await response.json();
    
    setScuccess("Status Updated Successfuly!")
  }
    
  return (
    <Grid container justifyContent="center" alignItems="center" >
      {/* <Grid item xs={3} sm={3} md={3} lg={3}></Grid> */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
      <TableContainer component={Paper} className="" style={{alignItems:"center"}}>
      <Table className=""  style={{margin:"50px",padding:"30px", width:"80%",border:"1px solid #eee"}}>
        <TableHead>
          <TableRow>
            <TableCell className="px-4 py-2">Ticket ID</TableCell>
            <TableCell className="px-4 py-2">PSD Number</TableCell>
            <TableCell className="px-4 py-2">Priority</TableCell>
            <TableCell className="px-4 py-2">Account</TableCell>
            <TableCell className="px-4 py-2">Sales</TableCell>
            <TableCell className="px-4 py-2">Status</TableCell>
            {/* <TableCell className="px-4 py-2">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d,i) => (
            <TableRow key={i}>
              <TableCell className="border px-4 py-2">{d.Research_PK}</TableCell>
              <TableCell className="border px-4 py-2">
                <Button size="large" color="inherit"  component={Link} to={`/tickets/${d.Research_PK}`} className='border' style={{border:"1px solid skyblue",color:"skyblue"}}>
                  {d.PSD_Number}
                </Button>
              </TableCell>
              <TableCell className="border px-4 py-2">{d.Ticket_Priority}</TableCell>
              <TableCell className="border px-4 py-2">{d.Account_ID}</TableCell>
              <TableCell className="border px-4 py-2">{d.Sales_Rep}</TableCell>
              <TableCell className="border px-4 py-2">{d.Ticket_Status!==""?d.Ticket_Status:""}</TableCell>
              {/* <TableCell className="border px-4 py-2">
                <Button size="large" color="primary" component={Link} to="/tasks"
                 style={{border:"0px solid skyblue",color:"skyblue"}}>
                   {d.Ticket_Status==="Assigned"?<span onClick={handleStatus(d.Research_PK,"Progress")}>Start</span>:d.Ticket_Status==="Progress"?<span>Complete</span>:" "}
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </Grid>
    
  );
};

export default CustomTable;
