import React from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomTable = ({ data }) => {
    const handleStatus=()=>{
console.log('status')

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
            <TableCell className="px-4 py-2">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="border px-4 py-2">{d.SF_Ticket_ID}</TableCell>
              <TableCell className="border px-4 py-2">
                <Button size="large" color="inherit" component={Link} to="/task-assignment" className='border' style={{border:"1px solid skyblue",color:"skyblue"}}>
                  {d.PSD_Number}
                </Button>
              </TableCell>
              <TableCell className="border px-4 py-2">{d.Ticket_Priority}</TableCell>
              <TableCell className="border px-4 py-2">{d.Account_ID}</TableCell>
              <TableCell className="border px-4 py-2">{d.Sales_Rep}</TableCell>
              <TableCell className="border px-4 py-2">{d.Ticket_Status!=""?d.Ticket_Status:"To Do"}</TableCell>
              <TableCell className="border px-4 py-2">
                <Button size="large" color="primary" component={Link} to="/tasks" onClick={handleStatus(d.SF_Ticket_ID)} style={{border:"1px solid skyblue",color:"skyblue"}}>
                  Start
                </Button>
              </TableCell>
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
