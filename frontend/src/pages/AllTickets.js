import Table from "../components/Table";
import ticketData from "../utils/ticketData";
//import { useEffect, useState } from "react";

const AllTickets=()=>{
    //const [tickets,setTickets]=useState([]);

    // async function fetchData() {
    //   const url = 'http://localhost:4000/api/tickets';
    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     setTickets(data); 
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }
    // useEffect(() => {
    //     fetchData();
    // }, []); 
    return(<Table data={ticketData}/>)

}
export default AllTickets;