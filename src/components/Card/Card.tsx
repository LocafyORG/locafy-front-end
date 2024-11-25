import { CButton, CCard, CCardBody,CCardSubtitle, CCardImage, CCardText, CCardTitle } from '@coreui/react';
import './Card.css';

interface CardProps {
	title: string
	description: string
	image: string
}

export default function Card({ title, description, image }: CardProps) {
	return <>
		<CCard>
			<CCardImage orientation="top" src={image} />
			<CCardBody>
				<CCardTitle>{title}</CCardTitle>
				<CCardSubtitle>Subtitle</CCardSubtitle>
				<CCardText>{description}</CCardText>
				<CCardText><small className="text-body-secondary">Last updated 3 mins ago</small></CCardText>
			</CCardBody>
		</CCard>
	</>

}

function Cardx({ title, description, image }: CardProps) {
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
