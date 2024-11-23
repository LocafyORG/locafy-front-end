import { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { CSidebar, CSidebarHeader, CSidebarNav, CSidebarToggler, CNavLink } from '@coreui/react';
import { Link } from 'react-router'
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
	const [activeButton, setActiveButton] = useState(-1);

	function activeButtonSwitch(newActiveIndex: number) {
		setActiveButton(newActiveIndex);
	}

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
								to={button.to} selfIndex={index}
								activeIndex={activeButton}
								onClick={activeButtonSwitch} />
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
	coreUiIcon: any,
	to: string
	selfIndex: number,
	activeIndex: number,
	onClick: (buttonIndex: number) => void,
}

function SidebarButton({ label, coreUiIcon, to, selfIndex, activeIndex, onClick }: SidebarButtonProps) {
	const [isActive, setIsActive] = useState(selfIndex==activeIndex);

	useEffect(() => {
		setIsActive(selfIndex==activeIndex);
	}, [activeIndex])

	return <>
		<CNavLink style={custVars} className="flex-grow-0" as={Link} to={to} active={isActive} onClick={() => {
			onClick(selfIndex);
		}}>
			<CIcon className={"sidebar-button-icon"} icon={coreUiIcon} />
			{label}
		</CNavLink>
	</>
}
