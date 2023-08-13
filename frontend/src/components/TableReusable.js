import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import ProgressBar from './ProgressBar';
import Select from './Select';

const TableReusable = ({ data, tdstyles, modifyHeader = (val) => val }) => {

  const handleSelectChange = (e) => {
    console.log(e.target.value);
  };

  const ele0 = data?.[0];

  const rows = data?.map((el, idx) => (
    <TableRow key={idx}>
      {Object.keys(ele0 || {}).map((key, colIdx) => (
        <TableCell key={colIdx} className={tdstyles}>
          {key === 'Completion_Status' ? (
            <div>
              <ProgressBar completion={el['Completion_Status']} />
              <span className='completion-status'>{el['Completion_Status']}%</span>
            </div>
          ) : (
            key === 'Assigned_To' ? (
              <Select options={[{ value: el[key], label: el[key] }]} value={el[key]} onChange={handleSelectChange} />
            ) : (
              <label style={{ marginLeft: 5 }}>{el[key]}</label>
            )
          )}
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(ele0 || {}).map((key, idx) => (
              <TableCell key={idx}>
                <label style={{ marginBottom: 0, marginLeft: 5 }}>
                  {modifyHeader(key).split("_").join(" ")}
                </label>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  );
};

export default TableReusable;
