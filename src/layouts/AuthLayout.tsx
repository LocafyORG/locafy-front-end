import { isAuthenticated } from "@api/auth/authTokenApi";
import { Col, Row } from "@components/Container";
import { ROUTES } from "@constants/Routes";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  return isAuthenticated() ? (
    <Navigate to={ROUTES.LOCATIONS} replace />
  ) : (
    <Row className="h-full bg-sunset">
      <div className="w-2/3 h-full bg-gradient-to-l from-black to-transparent"></div>
      <Col className="bg-white w-1/3 h-full m-0">
        <Outlet />
      </Col>
    </Row>
  );
}
