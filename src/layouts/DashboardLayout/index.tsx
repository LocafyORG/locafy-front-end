import { useEffect, useState } from 'react'
import Sidebar from '@components/Sidebar/Sidebar'
import UserProfile from '@components/Account/UserProfile'
import { Navigate, Outlet, useLocation } from 'react-router'
import { ROUTES } from '@constants/Routes'
import { cilLocationPin, cilCamera, cilContact, cilCalendar } from '@coreui/icons'
import { isAuthenticated } from '@api/auth/authTokenApi'
import './DashboardLayout.css'

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
		setAuth(isAuthenticated());		// Trigger recomposition every time the path changes within the dashboard
	}, [location]);

	return auth ?
		<div className="dashboard-layout">
			<Sidebar buttons={navButtons} />
			<div className="content-container">
				<UserProfile />
				<div className="content">
					<Outlet />
				</div>
			</div>
  	</div>
		:
		<Navigate to={ROUTES.LOGIN} replace />
}
