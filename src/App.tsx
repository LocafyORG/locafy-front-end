import { BrowserRouter, Routes, Route, } from 'react-router'
import { BASE_PATH, ROUTES } from '@constants/Routes'
import Home from '@pages/home/Home'
import Locations from '@pages/dashboard/locations/Locations'
import Productions from '@pages/dashboard/productions/Productions'
import Contacts from '@pages/dashboard/contacts/Contacts'
import About from '@pages/about/About';
import Profile from '@pages/profile/Profile';
import Pricing from '@pages/pricing/Pricing';
import Login from '@pages/Authentication/login/Login';
import Register from '@pages/Authentication/register/Register';
import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout'
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
        <Route path={ROUTES.REGISTER} element={<Register />} />
				<Route path={BASE_PATH} element={ <DashboardLayout /> }>
					<Route path={ROUTES.LOCATIONS} element={ <Locations /> } />
					<Route path={ROUTES.PRODUCTIONS} element={ <Productions /> } />
					<Route path={ROUTES.CONTACTS} element={ <Contacts /> } />
					<Route path={ROUTES.CALENDAR} element={ <Contacts /> } />
				</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
