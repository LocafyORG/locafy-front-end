import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Locations from './pages/Dashboard/Locations/Locations.tsx';
import Productions from './pages/Dashboard/Productions/Productions.tsx';
import About from './pages/About/About.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Contacts from './pages/Dashboard/Contacts/Contacts.tsx';
import Pricing from './pages/Pricing/Pricing.tsx';
import Login from './pages/Authentication/Login/Login.tsx';
import { ROUTES } from "./constants/Routes.ts";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOCATIONS} element={<Locations />} />
        <Route path={ROUTES.PRODUCTIONS} element={<Productions />} />
        <Route path={ROUTES.CONTACTS} element={<Contacts />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRICING} element={<Pricing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;