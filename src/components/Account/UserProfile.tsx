import { CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import Cheems from '@assets/img/under-development.webp'
import './UserProfile.css'

interface UserProfileProps {
	userBadgeSrc?: string
	iconButtons: IconButtonProps[]	
}

export default function UserProfile({ userBadgeSrc = Cheems, iconButtons = [] }: UserProfileProps) {
	return <div className="icon-container">
			<CImage className="user-badge" src={userBadgeSrc} width={40} height={40} />

			{iconButtons.map((b, index) => (
				<IconButton key={index} icon={b.icon} scale={b.scale} onClick={b.onClick} />
			))}
		</div>
}

interface IconButtonProps {
	icon: string[]
	scale?: number
	onClick?: () => void
}

function IconButton({ icon, scale = 1, onClick = () => {} }: IconButtonProps) {
	return <button className="icon-button" onClick={onClick}>
			<CIcon icon={icon} style={{ transform: `scale(${scale})` }} />
		</button>
}
