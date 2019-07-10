import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './CheckoutModal.scss';

const CheckoutModal = ({
  products,
  totalPriceAfterDiscount,
  closeCheckoutModal,
  handlePayment,
}) => {
  return (
    <div className="checkout-modal">
      <div className="checkout-modal__content">
        <button
          className="checkout-modal__close-button"
          onClick={closeCheckoutModal}
        >
          x
        </button>
        <h3 className="checkout-modal__header">Drogi kliencie,</h3>
        <p className="checkout-modal__text">
          Wypożyczyłeś filmów: <span>{products.length}</span>
        </p>
        <p className="checkout-modal__text">
          Łączna suma zamówienia: <span>{totalPriceAfterDiscount} zł</span>
        </p>
        <button className="checkout-modal__pay-button" onClick={handlePayment}>
          Przejdź do płatności
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;