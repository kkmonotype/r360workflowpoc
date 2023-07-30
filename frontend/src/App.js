import {Routes, BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeadPage from './pages/LeadPage';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/psds" element={<LeadPage />} />
        </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
