import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Locations from './pages/Locations/Locations.tsx';
import Productions from './pages/Productions/Productions.tsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locations" element={<Locations/>} />
      <Route path="/Productions" element={<Productions/>} />
      <Route path="/Contacts" element={<Productions/>} />
      <Route path="/About" element={<Productions/>} />
      <Route path="/Profile" element={<Productions/>} />


    </Routes>
    </BrowserRouter>
  );
}
export default App;