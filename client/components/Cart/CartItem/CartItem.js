import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProgressiveImage from 'react-progressive-image';
import Spinner from '../../Spinner/Spinner';

import './CartItem.scss';

const CartItem = ({
  item,
  removeFromCart,
  increaseTheAmount,
  decreaseTheAmount,
}) => {
  // calcualting total price of cart item - amount * price
  const totalItemPrice = item.amount * item.product.price;

  return (
    <div className="cart-item__item">
      <Row>
        <Col sm="3">
          <ProgressiveImage
            src={`https://image.tmdb.org/t/p/w500${item.product.poster_path}`}
            placeholder=""
          >
            {(src, loading) => {
              return loading ? (
                <Spinner />
              ) : (
                <div className="cart-item__item-thumbnail">
                  <Link href={`/product?product_id=${item.product.id}`}>
                    <img src={src} alt="movie thumbnail" />
                  </Link>
                </div>
              );
            }}
          </ProgressiveImage>
        </Col>
        <Col sm="9">
          <div className="cart-item__item-description">
            <h3 className="cart-item__item-title">
              {item.product.original_title}
            </h3>
            <div className="cart-item__amount">
              <p>Ilość tygodni wypożyczenia: </p>
              <div className="cart-item__item-counter-wrapper">
                <button
                  className="cart-item__button cart-item__button--amount"
                  onClick={() => increaseTheAmount(item.product)}
                >
                  +
                </button>
                <span>{item.amount}</span>
                <button
                  className="cart-item__button cart-item__button--amount"
                  onClick={
                    item.amount > 1
                      ? () => decreaseTheAmount(item.product)
                      : null
                  }
                >
                  -
                </button>
              </div>
            </div>
            <p className="cart-item__item-price">
              Cena: {item.product.price} zł{' '}
              <span>(za 1 tydzień wypożyczenia)</span>
            </p>
            <p className="cart-item__item-total">
              Wartość całkowita: <span>{totalItemPrice} zł</span>
            </p>
            <div className="cart-item__delete-button-wrapper">
              <button
                className="cart-item__button cart-item__button--delete"
                onClick={() => removeFromCart(item.product)}
              >
                Usuń
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  removeFromCart: PropTypes.func,
  increaseTheAmount: PropTypes.func,
  decreaseTheAmount: PropTypes.func,
};

export default CartItem;
