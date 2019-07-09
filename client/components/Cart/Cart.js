import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import GoBackButon from '../GoBackButton/GoBackButton';
import CartItem from './CartItem/CartItem';

import { addToCart } from '../../redux/cartActions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Cart.scss';

const Cart = ({ cart }) => {
  const cartItems = cart.map((item, i) => {
    return <CartItem key={i} item={item} />;
  });

  return (
    <Container>
      <GoBackButon />
      <div className="cart">
        {!cart.length ? (
          <p className="cart__empty-cart-info">Twój koszyk jest pusty</p>
        ) : (
          <Row>
            <Col xs="7">
              <div className="cart__content">{cartItems}</div>
            </Col>
          </Row>
        )}
      </div>

      <Row />
    </Container>
  );
};

const mapStateToProps = state => ({
  // movies: state.movies,
  cart: state.cart,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addToCart }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
