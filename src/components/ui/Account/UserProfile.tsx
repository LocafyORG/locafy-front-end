import { useNavigate } from "react-router";
import { CImage } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DefaultBadgeImage from "@assets/img/under-development.webp";
import "./UserProfile.css";
import { ROUTES } from "@constants/Routes";
import { ActionsMenu } from "../ListPane";
import { deleteAuthToken } from "@api/auth/authTokenApi";
import { ThemeToggle } from "../ThemeToggle";

interface UserProfileProps {
  badgeImageSrc?: string;
  className?: string;
  actionButtons?: ActionButtonProps[];
}

export default function UserProfile({
  badgeImageSrc = DefaultBadgeImage,
  className = "userProfile",
  actionButtons = [],
}: UserProfileProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    deleteAuthToken();
    navigate(ROUTES.HOME);
  };

  const handleViewProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <div className={`icon-container ${className}`}>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <ActionsMenu
          itemIndex={0}
          actions={{
            Profile: handleViewProfile,
            Logout: handleSignOut,
          }}
        >
          <CImage
            className="user-badge"
            src={badgeImageSrc}
            width={40}
            height={40}
          />
        </ActionsMenu>
      </div>

      {actionButtons.map((button, index) => (
        <ActionButton
          key={index}
          icon={button.icon}
          scale={button.scale}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
}

interface ActionButtonProps {
  icon: string[];
  scale?: number;
  onClick?: () => void;
}

function ActionButton({
  icon,
  scale = 1,
  onClick = () => {},
}: ActionButtonProps) {
  return (
    <button className="icon-button" onClick={onClick}>
      <CIcon icon={icon} style={{ transform: `scale(${scale})` }} />
    </button>
  );
}
