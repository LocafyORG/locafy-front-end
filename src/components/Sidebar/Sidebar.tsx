import { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { CSidebar, CSidebarHeader, CSidebarNav, CSidebarToggler, CNavLink } from '@coreui/react';
import { Link, useLocation } from 'react-router'
import './Sidebar.css'

const custVars = {
	"--cui-sidebar-nav-link-active-bg": "var(--cui-blue)",
	"--cui-sidebar-nav-link-active-color": "var(--cui-white)",
	"--cui-sidebar-nav-link-border-radius": "0% 30px 30px 0%"
}

interface SidebarProps {
	buttons: SidebarButtonProps[]
}

export default function Sidebar({ buttons = [] }: SidebarProps) {
  return (
    <div>
      <CSidebar className="sidebar-full-height border-end">
        <CSidebarHeader className="border-bottom sidebar-header">
          <i className="material-icons">whatshot</i>
          <span className="sidebar-title">Locus Point</span>
        </CSidebarHeader>
        <CSidebarNav>
					{ buttons.map((button, index) => (
							<SidebarButton label={button.label}
								coreUiIcon={button.coreUiIcon}
								to={button.to} key={index} />
					))}
        </CSidebarNav>
        <CSidebarHeader className="border-top">
          <CSidebarToggler />
        </CSidebarHeader>
      </CSidebar>
    </div>
  );
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
	}, [activePath])

	return <>
		<CNavLink style={custVars} className="flex-grow-0" as={Link} to={to} active={isActive}>
			<CIcon className={"sidebar-button-icon"} icon={coreUiIcon} />
			{label}
		</CNavLink>
	</>
}
