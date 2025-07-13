import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import "@styles/components/ui/Card.scss";

interface CardProps {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  image,
  onClick,
}: CardProps) {
  return (
    <CCard className="ui-production-card hover:bg-gray-200 cursor-pointer max-w-xs" onClick={onClick}>
      <CCardImage orientation="top" src={image} className="h-24 object-cover" />
      <CCardBody className="p-2">
        <CCardTitle className="text-xs font-semibold mb-1">{title}</CCardTitle>
        <CCardSubtitle className="text-xs text-gray-500 mb-1">Production</CCardSubtitle>
        <CCardText className="text-xs text-gray-600 mb-1 line-clamp-2">{description}</CCardText>
        <CCardText>
          <small className="text-body-secondary text-xs">Last updated 3 mins ago</small>
        </CCardText>
      </CCardBody>
    </CCard>
  );
}
