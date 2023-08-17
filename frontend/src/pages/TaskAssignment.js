import React, { useEffect, useState } from 'react';
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
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { green } from '@mui/material/colors';


const useStyles = makeStyles((theme) => ({
  taskAssignmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    border:"1px solid #eee"
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
    padding: "15px",
    borderBottom: "1px solid #eee"
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
    minWidth:"140px"
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#444",
    border:"1px solid #eee;",
    margin: theme.spacing(2),
    minWidth:"140px"
  },
}));

const TaskAssignment = () => {
  const classes = useStyles();
  const [completionStatus, setCompletionStatus] = useState(0);
  const [tasks, setTasks] = useState(taskData);
  const [isChecked, setIsChecked] = useState(true);
  const[userData,setUserData]=useState({})

  const [roles,setRoles]=useState([]);
  const [members,setMembers]=useState([]);
  const [member_name,setMemberName]=useState('');
  const [member,setMember]=useState('');
  const [role,setRole]=useState('');
  
  const [successmessage,setMessage]=useState('');
  const [rolemessage,setRoleMessage]=useState('');
  const[user,setUser]=useState([]);
  const { ticketId } = useParams();
  const [tickets,setTickets]=useState({});

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  async function fetchUserInfo() {

  const response = await fetch(`http://localhost:4000/api/users/david.kegelmayer@monotype.com`);
  const data = await response.json();
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  setUserData(data);

  }
  

  async function fetchRoles() {
    const url = 'http://localhost:4000/api/users-roles';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRoles(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchMembers() {
    const url = 'http://localhost:4000/api/Market Research/users?role=Team Member';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMembers(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchTicketData() {
    const url = 'http://localhost:4000/api/tickets/'+ticketId;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTickets(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleRoleAssignment(e){
console.log(e.target.value,'Department_ID===')
    const response = await fetch(`http://localhost:4000/api/tickets/role-assignment`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "Ticket_ID": ticketId,
          "Department_ID": e.target.value,
          "Role_ID": "Team Member",   
          "Assigned_By": userData.User_ID
        }),
  });
  const data = await response.json();

  setRoleMessage("Role Assigned Succesfully!");

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
 
    const response = await fetch(`http://localhost:4000/api/tickets/user-assignment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Ticket_ID": ticketId,
          "Role_ID": "Team Member",
          "Employee_ID": member,
          "Assigned_By": userData.User_ID
      }),
    });
    const data = await response.json();

    setMessage("TICKET ASSIGNED SUCCESSFULLY!");
};

  useEffect(() => {
    fetchRoles();
    fetchMembers();
    fetchUserInfo();
    fetchTicketData();
     setUser(localStorage.getItem("userdata"));
    console.log(userData,'55555')
  }, []); 

  return (
    <Container className={classes.taskAssignmentContainer}>
      <div className="task-box">
        <div className='task-ticket-details'>
          <Typography className={classes.taskHeading}>Ticket ID</Typography>
          <Typography className={classes.taskInfo}>{tickets.PSD_Number}</Typography>
        </div>
        <div className='task-ticket-details'>
          <Typography className={classes.taskHeading}>Account Name</Typography>
          <Typography className={classes.taskInfo}>{tickets.Account_ID}</Typography>
        </div>
        <div className={`className='task-ticket-details`}>
          <Typography className={classes.taskHeading}>Completion</Typography>
          <ProgressBar 
          //completion={completionStatus} 
          completion={tickets.Ticket_Status==="Assigned"?"0":tickets.Ticket_Status==="Completed"?"100":"0"}
          style={{marginTop:"15px"}}/>
          <Typography className={classes.completionStatus}>
            {/* {completionStatus}% */}
            {tickets.Ticket_Status==="Assigned"?"In Progress":tickets.Ticket_Status==="Completed"?"100%":"0%"}
          </Typography>
        </div>        
      </div>
      
      <div className={classes.assignResearcher}>
        <Typography className={classes.taskHeading}>Assign Role:<span style={{color:"green",fontSize:"13px"}}>{rolemessage}</span></Typography>
        <select className="mt-1 form-select ar-select w-full border-spacing-1"
        style={{ minWidth: '180px', border: '1px solid #ddd', height: '40px', borderRadius: '3px',paddingLeft:"6px" }}
         value={""} 
          onChange={(e)=>handleRoleAssignment(e)} >
          {roles.map((e)=>{
            return(<option value={e.department}>{e.name}</option>)
          })}
        </select>
      </div>

      <div className={classes.assignResearcher}>
        <Typography className={classes.taskHeading}>Assign Researcher:<span style={{color:"green",fontSize:"13px"}}>{member_name}</span></Typography>
        <select className="mt-1 form-select ar-select w-full"
          style={{ minWidth: '180px', border: '1px solid #ddd', height: '40px', borderRadius: '3px',paddingLeft:"6px" }}
          value={""} 
          onChange={(e) => {
            let AData=e.target.value;
            let Aname=AData.split('-')

            setMember(Aname[0])
            setMemberName(Aname[1])
            }}>
           {members.map((e)=>{
            return(<option value={e.User_ID+'-'+e.Name}>{e.Name}</option>)
          })}
        </select>
      </div>
      <div className={classes.assignTasks}>
        <Typography className={classes.taskHeading}>Assign Tasks</Typography>
        <Checkbox label="" isChecked={isChecked} onChange={handleCheckboxChange} />
      </div>
      
      {isChecked && (
        <div className={classes.taskDetails}>
          <TableReusable data={tasks} val={member_name} TicketStatus={tickets.Ticket_Status} members={members} tdstyles="tdstyles" />
        </div>
      )}
      {
        successmessage?<p style={{color:"#72c323", fontSize:"24px",fontWeight:"600"}}>{successmessage}</p>:
        <div className={classes.buttonContainer}>
        <Button
          type="submit"
          className={`${classes.nextButton} px-4 py-2`}
          variant="contained"
          onClick={handleSubmit}
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
        }
      
    </Container>
  );
};

export default TaskAssignment;
