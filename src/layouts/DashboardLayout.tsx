import { useState } from 'react'
import Sidebar from '@components/Sidebar/Sidebar'
import UserProfile from '@components/Account/UserProfile'
import { Outlet } from 'react-router'
import { ROUTES } from '@constants/Routes'
import { cilLocationPin, cilCamera, cilContact, cilCalendar } from '@coreui/icons'

export default function DashboardLayout() {
	
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
			to: ROUTES.CONTACTS,
		},
	]);

	return <>
		<div className="app-container">
			<Sidebar buttons={navButtons} />
    	<div className="main-content">
      	<UserProfile />
				<Outlet />
			</div>
  	</div>
	</>
}
