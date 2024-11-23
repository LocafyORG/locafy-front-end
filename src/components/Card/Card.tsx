import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react';
import './Card.css';

interface CardProps {
	title: string
	description: string
	image: string
}

function Card({ title, description, image }: CardProps) {
  return (
    <CCard className="card-item">
    <CCardImage orientation="top" src={image}/>
    <CCardBody>
      <CCardTitle>{title}</CCardTitle>
      <CCardText>{description}</CCardText>
      <CButton color="primary" href="#">
        edit
      </CButton>
    </CCardBody>
  </CCard>
  );
}
export default Card;
