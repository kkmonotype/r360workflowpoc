import {Routes, BrowserRouter, Route,Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeadPage from './pages/LeadPage';
import ResearcherPage from './pages/ResearcherPage';
import './App.css';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import AllTickets from './pages/AllTickets';
import TaskAssignment from './pages/TaskAssignment';
import Tasks from './pages/Tasks';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(()=>{
    const loggedIn=localStorage.getItem('loggedIn')
 
    if(loggedIn==='true'){

      setisLoggedIn(true)

    }else{
      setisLoggedIn(false) 
    }


  },[])

  return (
    
      <div className="App">
        <header className="App-header">
        <BrowserRouter>
        <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login />} />
              
            ) : (
              <>
                <Route path="/home" element={<HomePage isLoggedIn={isLoggedIn}/>} />
                <Route path="/lead" element={<LeadPage />} />
                <Route path="/researcher" element={<ResearcherPage />} />
                <Route path="/tickets" element={<AllTickets />} />
                <Route path="/task-assignment" element={<TaskAssignment />} />
                <Route path="/tasks" element={<Tasks />} />
              </>
            )}           
        </Routes>
        </BrowserRouter>
        </header>
      </div>
    
  );
}

export default App;
