import React from 'react'
import styled from 'styled-components'

import AddCard from '@components/AddCard'
import GoBackButton from '@components/GoBackButton'

const StyledPayment = styled.div`
  background: white;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 5px;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  text-align: center;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(200%)')};
  transition: transform 350ms ease;
  width: 100%;
  z-index: 500;
  > div {
    max-width: 65%;
    margin: 5rem auto 0 auto;
    height: 100%;
  }
`

const PaymentMethod = styled.div`
  align-items: flex-start;
  background: white;
  border-bottom: 2px solid var(--dark-app-color);
  display: flex;
  flex-flow: column;
  padding: 0.75rem 1.75rem;
  text-transform: uppercase;
  width: 100%;
  p {
    color: #545454;
    line-height: 2;
  }
`

const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  margin: 2rem auto;
  padding: 3em 1.5em;
  text-transform: uppercase;
  width: 50%;
  color: #393d69;
  :hover {
    background: #f5f5f5;
  }
`

const Payment = ({ show, payments, onAddCard, onClose, visibleAddCard, toggleVisibleAddCard }) => (
  <StyledPayment show={show}>
    <GoBackButton onClick={onClose} />
    <div>
      {renderPayments(payments)}
      <Button onClick={toggleVisibleAddCard}>Añadir metodo</Button>
    </div>
    <AddCard show={visibleAddCard} onClose={toggleVisibleAddCard} onSubmit={onAddCard} />
  </StyledPayment>
)

const renderPayments = payments =>
  payments.map((payment, ix) => (
    <PaymentMethod key={ix}>
      <h4>{payment.name}</h4>
      <p>{payment.card}</p>
    </PaymentMethod>
  ))

export default Payment
