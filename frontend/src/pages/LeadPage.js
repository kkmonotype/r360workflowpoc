// Create react component to display list of tasks
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import logo from '../logo.svg';


function LeadPage() {
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
        console.log(psdId);
        // Upadte task status to in progress
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/psd/${psdId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Ticket_Status: status }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="task-list">
            <img src={logo} alt="logo" className="App-logo" />

            <h1>Lead Page</h1>

            <h2>PSD List</h2>
            {tickets.map((ticket) => (
                <div className="task" key={ticket.R360_PSD_ID}>

                    <h4>Ticket Id: {ticket.R360_PSD_ID}</h4>

                    <p>Ticket Priority: {ticket.Ticket_Priority}</p>

                    <p>Ticket Status: {ticket.Ticket_Status}</p>

                    <p>ETA: {ticket.ETC}</p>

                    <p>Cohort Id: {ticket.Cohort_FK}</p>



                    {!ticket.Ticket_Status && (
                        <div>
                            <Button variant="contained"
                                onClick={() => handleAccept(ticket.R360_PSD_ID, 'open')}
                            >
                                Assign To Researcher
                            </Button>
                        </div>
                    )}
                    <hr />
                </div>
            ))}
            <p>{message}</p>
        </div>
    );
}

export default LeadPage;