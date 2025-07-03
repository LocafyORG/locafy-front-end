import { useNavigate } from "react-router";
import DefaultBadgeImage from "@/assets/img/under-development.webp";
import "./UserProfile.css";
import { deleteAuthToken } from "@/services/api/auth/authTokenApi";
import { ROUTES } from "@/constants/Routes";
import { ActionsMenu } from "../ListPane";

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
      <ActionsMenu
        itemIndex={0}
        actions={{
          Profile: handleViewProfile,
          Logout: handleSignOut,
        }}
      >
      </ActionsMenu>

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
