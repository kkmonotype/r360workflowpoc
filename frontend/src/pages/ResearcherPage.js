// Create react component to display list of tasks
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AlertComponent from "../components/AlertComponent";
import logo from '../logo.svg';


function ResearcherPage() {
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getPSDs = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/psds`);
            const data = await response.json();

            setTickets(data);
        };
        getPSDs();
    }, []);

    const handleAccept = async (psdId, status) => {
        const employeeId = '0052R000009xw09QAA';
        // Upadte task status to in progress
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/psd/${psdId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Ticket_Status: status,
                Employee_FK: employeeId
            }),
        });
        const data = await response.json();

        setMessage(data.message);
    };

    return (
        <div className="task-list">
            <img src={logo} alt="logo" className="App-logo" />

            <h1>Researcher Page</h1>

            <h2>PSD List</h2>

            {message &&
                <AlertComponent message={message} severity="success" />
            }

            {tickets.map((ticket) => (
                <div className="task" key={ticket.R360_PSD_ID}>
                    <h4>Ticket Id: {ticket.R360_PSD_ID}</h4>

                    <p>Priority: {ticket.Ticket_Priority}</p>

                    <p>Ticket Status: {ticket.Ticket_Status}</p>

                    <p>ETA: {ticket.ETC}</p>

                    {'open' === ticket.Ticket_Status && (
                        <div>
                            <Button variant="contained"
                                onClick={() => handleAccept(ticket.R360_PSD_ID, 'todo')}
                            >
                                Assign To Yourself
                            </Button>
                        </div>
                    )}
                    {'todo' === ticket.Ticket_Status && (
                        <div>
                            <Button variant="contained"
                                onClick={() => handleAccept(ticket.R360_PSD_ID, 'in-progress')}
                            >
                                Mark In-Progress
                            </Button>
                        </div>
                    )}
                    {'in-progress' === ticket.Ticket_Status && (
                        <div>
                            <Button variant="contained"
                                onClick={() => handleAccept(ticket.R360_PSD_ID, 'completed')}
                            >
                                Complete
                            </Button>
                        </div>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default ResearcherPage;