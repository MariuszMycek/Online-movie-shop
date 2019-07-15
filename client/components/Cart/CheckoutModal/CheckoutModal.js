import React from 'react';
import PropTypes from 'prop-types';

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

CheckoutModal.propTypes = {
  totalPriceAfterDiscount: PropTypes.string,
  closeCheckoutModal: PropTypes.func,
  products: PropTypes.array,
  handlePayment: PropTypes.func,
};

export default CheckoutModal;
