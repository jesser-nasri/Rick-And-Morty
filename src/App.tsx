import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  
import CardDetails from './pages/CardDetails'; 

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/card/:id" element={<CardDetails />} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
