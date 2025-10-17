import { isAuthenticated } from "@api/auth/authTokenApi";
import { Col, Row } from "@components/Container";
import { ROUTES } from "@constants/Routes";
import { Navigate, Outlet } from "react-router";
import { ThemeToggle } from "@components/ui/ThemeToggle";

export default function AuthLayout() {
  return isAuthenticated() ? (
    <Navigate to={ROUTES.LOCATIONS} replace />
  ) : (
    <Row className="h-full bg-sunset dark:bg-gray-900">
      <div className="w-2/3 h-full bg-gradient-to-l from-black to-transparent"></div>
      <Col className="bg-white dark:bg-gray-800 w-1/3 h-full m-0 relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <Outlet />
      </Col>
    </Row>
  );
}
