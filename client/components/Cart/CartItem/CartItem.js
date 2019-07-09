import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './CartItem.scss';

const CartItem = ({ item }) => {
  const totalItemPrice = item.amount * item.product.price;
  return (
    <div className="cart-item__item">
      <Row>
        <Col xs="3">
          <div className="cart-item__item-thumbnail">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.product.poster_path}`}
              alt="movie thumbnail"
            />
          </div>
        </Col>
        <Col>
          <div className="cart-item__item-description">
            <div className="cart-item__item-title">
              {item.product.original_title}
            </div>
            <div className="cart-item__item-price">
              Cena: {item.product.price} zł{' '}
              <span>(za 1 tydzień wypożyczenia)</span>
            </div>
            <div className="cart-item__amount">
              Ilość tygodni wypożyczenia:{' '}
              <button className="cart-item__button cart-item__button--amount">
                +
              </button>
              {item.amount}
              <button className="cart-item__button cart-item__button--amount">
                -
              </button>
            </div>
            <div className="cart-item__item-total">
              Wartość całkowita: <span>{totalItemPrice} zł</span>
            </div>
            <div className="cart-item__delete-button-wrapper">
              <button className="cart-item__button cart-item__button--delete">
                Usuń
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
