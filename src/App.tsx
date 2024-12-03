import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // Import Home page
import CardDetails from './pages/CardDetails';  // Import CardDetails page

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home page route */}
          <Route path="/card/:id" element={<CardDetails />} />  {/* CardDetails page route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
