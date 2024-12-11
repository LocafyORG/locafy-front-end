import { useNavigate } from "react-router";
import { CImage } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Cheems from "@assets/img/under-development.webp";
import "./UserProfile.css";
import { deleteAuthToken } from "@api/auth/authTokenApi";
import { ROUTES } from "@constants/Routes";
import { ActionsMenu } from "../ListPane";

interface UserProfileProps {
  userBadgeSrc?: string;
  className?: string;
  iconButtons?: IconButtonProps[];
}

export default function UserProfile({
  userBadgeSrc = Cheems,
  className = "",
  iconButtons = [],
}: UserProfileProps) {
  const navigate = useNavigate();

  const signOut = () => {
    deleteAuthToken();
    navigate(ROUTES.HOME);
  };

  return (
    <div className={`icon-container ${className}`}>
      <ActionsMenu
        itemIndex={0}
        actions={{
          Logout: signOut,
        }}
      >
        <CImage
          className="user-badge"
          src={userBadgeSrc}
          width={40}
          height={40}
        />
      </ActionsMenu>

      {iconButtons.map((b, index) => (
        <IconButton
          key={index}
          icon={b.icon}
          scale={b.scale}
          onClick={b.onClick}
        />
      ))}
    </div>
  );
}

interface IconButtonProps {
  icon: string[];
  scale?: number;
  onClick?: () => void;
}

function IconButton({ icon, scale = 1, onClick = () => {} }: IconButtonProps) {
  return (
    <button className="icon-button" onClick={onClick}>
      <CIcon icon={icon} style={{ transform: `scale(${scale})` }} />
    </button>
  );
}
