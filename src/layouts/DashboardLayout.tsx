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
import { ArrowLeft } from "lucide-react";

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
        <div className="flex flex-col w-full max-w-screen-xl pt-0 pr-10">
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
  leftButtons?: ButtonProps[];
}

export function DashboardPageHeader({
  title,
  buttons = [],
  leftButtons = [],
}: DashboardPageHeaderProps) {
  return (
    <div className="mt-12 mb-3">
      {/* Title on its own row with padding below */}
      <h1 className="text-4xl text-gray-500 pl-4 pb-3">{title}</h1>

      {/* Left buttons under the title, right-side buttons stay aligned */}
      <div className="flex flex-row justify-between items-center">
        <div className="pl-4 flex gap-2">
          {leftButtons.map((leftButton, index) => (
            <Button
              {...leftButton}
              key={index}
              className="!bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-lg shadow-sm 
                         hover:!bg-gray-100 transition-all duration-200"
            />
          ))}
        </div>

        {/* Right-side buttons */}
        <div className="flex gap-3">
          {buttons.map((button, index) => (
            <Button {...button} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
