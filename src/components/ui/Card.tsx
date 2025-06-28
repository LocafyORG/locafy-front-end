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
    <CCard className="hover:bg-gray-200 cursor-pointer" onClick={onClick}>
      <CCardImage orientation="top" src={image} />
      <CCardBody>
        <CCardTitle>{title}</CCardTitle>
        <CCardSubtitle>Subtitle</CCardSubtitle>
        <CCardText>{description}</CCardText>
        <CCardText>
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </CCardText>
      </CCardBody>
    </CCard>
  );
}
