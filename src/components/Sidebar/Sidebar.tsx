import { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { CNavLink, CSidebar } from '@coreui/react';
import { Link, useLocation } from 'react-router'
import './Sidebar.css'

interface SidebarProps {
	buttons: SidebarButtonProps[]
}

export default function Sidebar({ buttons = [] }: SidebarProps) {
	return <>
		<CSidebar className="cust-sidebar">
			<SidebarBrand />
			<SidebarNav buttons={buttons} />
		</CSidebar>
	</>
}

function SidebarBrand() {
	return <div className="cust-sidebar-brand">
		<i className="material-icons">whatshot</i>
		<span className="sidebar-title">Locus Point</span>
	</div>
}

interface SidebarNavProps {
	buttons: SidebarButtonProps[]
}

function SidebarNav({ buttons = [] }: SidebarNavProps) {
	return <nav className="cust-sidebar-nav">
		{ buttons.map((button, index) => (
				<SidebarButton label={button.label}
					coreUiIcon={button.coreUiIcon}
					to={button.to} key={index} />
		))}
	</nav>
}

interface SidebarButtonProps {
	label: string
	coreUiIcon: string[],
	to: string
}

function SidebarButton({ label, coreUiIcon, to }: SidebarButtonProps) {
	const [isActive, setIsActive] = useState(false);
	const activePath = useLocation()

	useEffect(() => {
		setIsActive(activePath.pathname.startsWith(to, 0));
	}, [activePath, to])

	return <>
		<CNavLink as={Link} className={`cust-sidebar-button ${(isActive) ? "active" : ""}`} to={to}>
			<span className="active-highlight"></span>
			<span className="content">
				<CIcon className="cust-button-icon" icon={coreUiIcon} />
				{label}
			</span>
		</CNavLink>
	</>
}
