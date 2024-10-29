import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react';
import React from 'react';
import './Card.css';

function Card(props: any) {
  return (
    <CCard className="card-item">
    <CCardImage orientation="top" src={props.image}/>
    <CCardBody>
      <CCardTitle>{props.title}</CCardTitle>
      <CCardText>{props.description}</CCardText>
      <CButton color="primary" href="#">
        edit
      </CButton>
    </CCardBody>
  </CCard>
  );
}
export default Card;