import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as CartActions from '../../redux/cartActions';

import GoBackButon from '../GoBackButton/GoBackButton';
import CartItem from './CartItem/CartItem';
import CheckoutModal from './CheckoutModal/CheckoutModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Cart.scss';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      inputVisible: false,
      checkoutModalVisible: false,
    };
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getDiscount(this.state.inputValue);

    this.setState({ inputValue: '', inputVisible: false });
  };

  handleToggleInput = () => {
    this.setState({ inputVisible: !this.state.inputVisible });
  };

  showCheckoutModal = () => this.setState({ checkoutModalVisible: true });

  closeCheckoutModal = () => this.setState({ checkoutModalVisible: false });

  handlePayment = () => {
    this.setState({ checkoutModalVisible: false });
    this.props.resetCart();
    Router.push('/');
  };

  render() {
    const {
      products,
      removeFromCart,
      increaseTheAmount,
      decreaseTheAmount,
      discount,
      setDiscount,
    } = this.props;

    const isDiscount = discount !== 0;

    const productTotalPriceArray = products.map(
      item => item.amount * item.product.price
    );

    const totalPrice =
      productTotalPriceArray.length > 0
        ? +productTotalPriceArray.reduce((a, b) => a + b).toFixed(2)
        : 0;

    const totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * discount) / 100
    ).toFixed(2);

    return (
      <Container>
        <GoBackButon />

        <div className="cart">
          <Row>
            <Col xl="7">
              <CSSTransition
                in={products.length === 0}
                timeout={1000}
                classNames="fade-and-resize-with-delay"
                unmountOnExit
              >
                <p className="cart__empty-cart-info">Twój koszyk jest pusty</p>
              </CSSTransition>
              <CSSTransition
                in={products.length > 0}
                timeout={500}
                classNames="fade"
                unmountOnExit
              >
                <div className="cart__content">
                  <TransitionGroup component={null}>
                    {products.map(item => (
                      <CSSTransition
                        key={item.product.id}
                        timeout={500}
                        classNames="fade"
                      >
                        <CartItem
                          item={item}
                          removeFromCart={removeFromCart}
                          increaseTheAmount={increaseTheAmount}
                          decreaseTheAmount={decreaseTheAmount}
                        />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </div>
              </CSSTransition>
            </Col>
            <Col xl="5">
              <div className="cart__checkout">
                <h4 className="cart__checkout-header">Podsumowanie</h4>
                <div className="cart__order-value-details">
                  <p className="cart__checkout-paragraph">
                    Wartość zamówienia: <span>{totalPrice} zł</span>
                  </p>
                  <p className="cart__checkout-paragraph">
                    Udzielony rabat: <span>{discount}%</span>
                  </p>
                  <p className="cart__checkout-paragraph">
                    Razem do zapłaty: <span>{totalPriceAfterDiscount} zł</span>
                  </p>
                </div>
                <div className="cart__checkout-button-wrapper">
                  <CSSTransition
                    in={this.state.inputVisible}
                    timeout={300}
                    classNames="fade-and-resize"
                    unmountOnExit
                  >
                    <form onSubmit={this.handleSubmit}>
                      <input
                        className="cart__discount-input"
                        type="text"
                        placeholder={
                          isDiscount
                            ? 'kod rabatowy już został wykorzystany'
                            : 'wprowadź kod rabatowy'
                        }
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        autoFocus
                      />
                    </form>
                  </CSSTransition>
                  {isDiscount ? (
                    <button
                      className="cart__checkout-button cart__checkout-button--discount"
                      onClick={() => setDiscount(0)}
                    >
                      Usuń rabat
                    </button>
                  ) : (
                    <button
                      className="cart__checkout-button cart__checkout-button--discount"
                      onClick={this.handleToggleInput}
                    >
                      Kod rabatowy
                    </button>
                  )}
                  <button
                    className="cart__checkout-button cart__checkout-button--submit"
                    onClick={this.showCheckoutModal}
                    disabled={products.length === 0}
                  >
                    Złóż zamówienie
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <CSSTransition
          in={this.state.checkoutModalVisible}
          timeout={300}
          classNames="fade-and-resize"
          unmountOnExit
        >
          <CheckoutModal
            {...this.props}
            totalPriceAfterDiscount={totalPriceAfterDiscount}
            closeCheckoutModal={this.closeCheckoutModal}
            handlePayment={this.handlePayment}
          />
        </CSSTransition>
      </Container>
    );
  }
}

Cart.propTypes = {
  getDiscount: PropTypes.func,
  resetCart: PropTypes.func,
  products: PropTypes.array,
  removeFromCart: PropTypes.func,
  increaseTheAmount: PropTypes.func,
  decreaseTheAmount: PropTypes.func,
  discount: PropTypes.number,
  setDiscount: PropTypes.func,
};

const mapStateToProps = state => ({
  products: state.cart.products,
  discount: state.cart.discount,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CartActions }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
