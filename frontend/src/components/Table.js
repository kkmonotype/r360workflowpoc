import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomTable = ({ data }) => {
  return (
    <TableContainer component={Paper} className="w-full overflow-x-auto">
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell className="px-4 py-2">Ticket ID</TableCell>
            <TableCell className="px-4 py-2">Priority</TableCell>
            <TableCell className="px-4 py-2">Account</TableCell>
            <TableCell className="px-4 py-2">Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="border px-4 py-2">
                <Button size="large" color="inherit" component={Link} to="/task-assignment">
                  {d.Ticket_ID}
                </Button>
              </TableCell>
              <TableCell className="border px-4 py-2">{d.Priority}</TableCell>
              <TableCell className="border px-4 py-2">{d.Account}</TableCell>
              <TableCell className="border px-4 py-2">{d.Sales_Rep}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
