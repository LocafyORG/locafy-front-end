import { useEffect, useState } from "react";
import Sidebar from "@components/ui/Sidebar";
import UserProfile from "@components/ui/Account/UserProfile";
import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@constants/Routes";
import {
  cilLocationPin,
  cilCamera,
  cilContact,
  cilCalendar,
} from "@coreui/icons";
import { isAuthenticated } from "@api/auth/authTokenApi";
import "@styles/layouts/DashboardLayout.scss";
import { Button, ButtonProps } from "@components/Button";

export default function DashboardLayout() {
  const location = useLocation();
  const [auth, setAuth] = useState<boolean>(isAuthenticated());
  const [navButtons] = useState([
    {
      label: "Productions",
      coreUiIcon: cilCamera,
      to: ROUTES.PRODUCTIONS,
    },
    {
      label: "Locations",
      coreUiIcon: cilLocationPin,
      to: ROUTES.LOCATIONS,
    },
    {
      label: "Contacts",
      coreUiIcon: cilContact,
      to: ROUTES.CONTACTS,
    },
    {
      label: "Calendar",
      coreUiIcon: cilCalendar,
      to: ROUTES.CALENDAR,
    },
  ]);

  useEffect(() => {
    setAuth(isAuthenticated()); // Trigger recomposition every time the path changes within the dashboard
  }, [location]);

  return auth ? (
    <div className="dashboard-layout overflow-hidden">
      <Sidebar buttons={navButtons} />
      <div className="flex flex-column items-center justify-start w-full">
        <UserProfile className="flex-grow-0 w-full" />
        <div className="flex flex-column w-full max-w-screen-xl space-y-4 p-5 pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
}

interface DashboardPageHeaderProps {
  title: string;
  buttons?: ButtonProps[];
}

export function DasboardPageHeader({
  title,
  buttons = [],
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center mt-12 mb-3">
      <h1 className="text-4xl">{title}</h1>
      {buttons.map((button, index) => (
        <Button {...button} key={index} />
      ))}
    </div>
  );
}
