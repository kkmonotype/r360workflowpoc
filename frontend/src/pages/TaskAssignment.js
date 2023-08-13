import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import Checkbox from '../components/Checkbox';
import taskData from '../utils/taskData';
import TableReusable from '../components/TableReusable';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  taskAssignmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  taskDetails: {
    display: 'flex',
    // justifyContent:"space-between",
    flexDirection: 'column',

    marginBottom: theme.spacing(2),
    width: '100%',
  },
  taskDetailsOne: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  taskHeading: {
    fontWeight: 'bold',
    paddingLeft:'6px'
  },
  taskInfo: {
    marginLeft: theme.spacing(1),
    color: "#444",
    fontWeight: "600",
    paddingTop:'10px'
  },
  completionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  completionStatus: {
    marginLeft: theme.spacing(1),
  },
  assignResearcher: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent:"space-between",
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  assignTasks: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  nextButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    margin: theme.spacing(2),
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#444",
    border:"1px solid #eee;",
    margin: theme.spacing(2),
  },
}));

const TaskAssignment = () => {
  const classes = useStyles();
  const [completionStatus, setCompletionStatus] = useState(40);
  const [tasks, setTasks] = useState(taskData);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Container className={classes.taskAssignmentContainer}>
      <div className="task-box">
        <div className='task-ticket-details'>
          <Typography className={classes.taskHeading}>Ticket ID</Typography>
          <Typography className={classes.taskInfo}>PSD-29610</Typography>
        </div>
        <div className='task-ticket-details'>
          <Typography className={classes.taskHeading}>Account Name</Typography>
          <Typography className={classes.taskInfo}>Netflix</Typography>
        </div>
        <div className={`className='task-ticket-details`}>
          <Typography className={classes.taskHeading}>Completion</Typography>
          <ProgressBar completion={completionStatus} />
          <Typography className={classes.completionStatus}>
            {completionStatus}%
          </Typography>
        </div>        
      </div>
      
      <div className={classes.assignResearcher}>
        <Typography className={classes.taskHeading}>Assign Role</Typography>
        <Select className="mt-1 form-select ar-select w-full border-spacing-1"
        style={{ minWidth: '180px', border: '1px solid #ddd', height: '40px', borderRadius: '3px' }}
         value={""} onChange={(e) => e.target.value}>
          <MenuItem value="Riya">Editor</MenuItem>
        </Select>
      </div>

      <div className={classes.assignResearcher}>
        <Typography className={classes.taskHeading}>Assign Researcher</Typography>
        <Select className="mt-1 form-select ar-select w-full"
                style={{ minWidth: '180px', border: '1px solid #ddd', height: '40px', borderRadius: '3px' }}

        value={""} onChange={(e) => e.target.value}>
          <MenuItem value="Riya">Riya</MenuItem>
        </Select>
      </div>
      <div className={classes.assignTasks}>
        <Typography className={classes.taskHeading}>Assign Tasks</Typography>
        <Checkbox label="" isChecked={isChecked} onChange={handleCheckboxChange} />
      </div>
      
      {isChecked && (
        <div className={classes.taskDetails}>
          <TableReusable data={tasks} tdstyles="tdstyles" />
        </div>
      )}
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          className={`${classes.nextButton} px-4 py-2`}
          variant="contained"
        >
          Save
        </Button>
        <Button
          type="submit"
          className={`${classes.cancelButton} px-4 py-2`}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default TaskAssignment;
