import {Routes, BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeadPage from './pages/LeadPage';
import ResearcherPage from './pages/ResearcherPage';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lead" element={<LeadPage />} />
              <Route path="/researcher" element={<ResearcherPage />} />
        </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
