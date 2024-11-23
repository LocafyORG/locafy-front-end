import { BrowserRouter, Routes, Route, } from 'react-router'
import { ROUTES } from '@constants/Routes'
import Home from '@pages/Home/Home'
import Locations from '@pages/dashboard/locations/Locations'
import Productions from '@pages/dashboard/productions/Productions'
import Contacts from '@pages/dashboard/contacts/Contacts'
import About from '@pages/About/About';
import Profile from '@pages/Profile/Profile';
import Pricing from '@pages/Pricing/Pricing';
import Login from '@pages/Authentication/Login/Login';
import DashboardLayout from '@layouts/DashboardLayout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRICING} element={<Pricing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={"dashboard"} element={ <DashboardLayout /> }>
					<Route path={"locations"} element={ <Locations /> } />
					<Route path={"productions"} element={ <Productions /> } />
					<Route path={"contacts"} element={ <Contacts /> } />
				</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
