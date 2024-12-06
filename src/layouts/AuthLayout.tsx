import { isAuthenticated } from '@api/auth/authTokenApi';
import { ROUTES } from '@constants/Routes';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
	return isAuthenticated() ?
		<Navigate to={ROUTES.LOCATIONS} replace />
	:
		<Outlet />
}

