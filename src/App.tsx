import { BrowserRouter, Routes, Route } from "react-router";
import {
  BASE_AUTH_PATH,
  DASHBOARD,
  BASE_PATH,
  ROUTES,
} from "@constants/Routes";
import Home from "@pages/Home";
import { Locations, AddLocation, Location } from "@pages/dashboard/locations";
import { Contacts, AddContact } from "@pages/dashboard/contacts";
import Profile from "@pages/Profile";
import Pricing from "@pages/Pricing";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import DashboardLayout from "@layouts/DashboardLayout";
import AuthLayout from "@layouts/AuthLayout";
import "@styles/App.scss";
import { Contact } from "@pages/dashboard/contacts/Contact";
import {
  Productions,
  Production,
  AddProduction,
} from "@pages/dashboard/productions";
import { EditProduction } from "@pages/dashboard/productions/EditProduction";
import { EditLocation } from "@pages/dashboard/locations/EditLocation";
import { EditContact } from "@pages/dashboard/contacts/EditContact";

/**
 *
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRICING} element={<Pricing />} />

        {/* Auth Routes */}
        <Route path={BASE_AUTH_PATH} element={<AuthLayout />}>
          <Route index path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>

        {/* Location Routes */}
        <Route path={BASE_PATH} element={<DashboardLayout />}>
          <Route path={DASHBOARD.LOCATIONS} element={<Locations />} />
          <Route
            path={`${DASHBOARD.LOCATIONS}/:locationId`}
            element={<Location />}
          />
          <Route path={DASHBOARD.ADD_LOCATION} element={<AddLocation />} />
          <Route
            path={`${DASHBOARD.EDIT_LOCATION}/:locationId`}
            element={<EditLocation />}
          />

          {/* Productions Routes */}
          <Route path={DASHBOARD.PRODUCTIONS} element={<Productions />} />
          <Route
            path={`${DASHBOARD.PRODUCTIONS}/:productionId`}
            element={<Production />}
          />
          <Route path={DASHBOARD.ADD_PRODUCTION} element={<AddProduction />} />
          <Route
            path={`${DASHBOARD.EDIT_PRODUCTION}/:productionId`}
            element={<EditProduction />}
          />

          {/* Dashboard Home */}

          {/* Contacts Routes */}
          <Route path={DASHBOARD.CONTACTS} element={<Contacts />} />
          <Route
            path={`${DASHBOARD.CONTACTS}/:contactId`}
            element={<Contact />}
          />
          <Route path={DASHBOARD.ADD_CONTACT} element={<AddContact />} />
          <Route
            path={`${DASHBOARD.EDIT_CONTACT}/:contactId`}
            element={<EditContact />}
          />
          {/* Calendar Routes */}
          <Route path={ROUTES.CALENDAR} element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
