import { CCard, CCardBody,CCardSubtitle, CCardImage, CCardText, CCardTitle } from '@coreui/react';
import '@styles/components/Card.scss';

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
