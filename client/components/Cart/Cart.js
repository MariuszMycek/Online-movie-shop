import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import discounts from '../../../discounts.json';

import * as CartActions from '../../redux/cartActions';

import GoBackButon from '../GoBackButton/GoBackButton';
import CartItem from './CartItem/CartItem';
import CheckoutModal from './CheckoutModal/CheckoutModal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    if (
      discounts.includes(this.state.inputValue) &&
      this.props.discount === 0
    ) {
      this.props.setDiscount(+this.state.inputValue);

      alert(`Kod poprawny!

      Przyznano rabat w wysokości ${this.state.inputValue}%`);
    } else {
      alert('Niestety podany kod nie jest poprawny');
    }
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

  renderDiscountInput = () => {
    const isDiscount = this.props.discount !== 0;

    return (
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
          autoFocus={true}
          disabled={isDiscount}
        />
      </form>
    );
  };

  render() {
    const {
      products,
      removeFromCart,
      increaseTheAmount,
      decreaseTheAmount,
      discount,
    } = this.props;

    const cartItems = products.map((item, i) => {
      return (
        <CartItem
          key={i}
          item={item}
          removeFromCart={removeFromCart}
          increaseTheAmount={increaseTheAmount}
          decreaseTheAmount={decreaseTheAmount}
        />
      );
    });

    const productTotalPriceArray = products.map(
      item => item.amount * item.product.price
    );

    const totalPrice = productTotalPriceArray.length
      ? productTotalPriceArray.reduce((a, b) => a + b).toFixed(2)
      : 0;

    const totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * discount) / 100
    ).toFixed(2);

    const checkoutModal = (
      <CheckoutModal
        {...this.props}
        totalPriceAfterDiscount={totalPriceAfterDiscount}
        closeCheckoutModal={this.closeCheckoutModal}
        handlePayment={this.handlePayment}
      />
    );
    return (
      <Container>
        <GoBackButon />
        <div className="cart">
          {!products.length ? (
            <p className="cart__empty-cart-info">Twój koszyk jest pusty</p>
          ) : (
            <Row>
              <Col xs="7">
                <div className="cart__content">{cartItems}</div>
              </Col>
              <Col xs="5">
                <div className="cart__checkout">
                  <h4 className="cart__checkout-header">Podsumowanie</h4>
                  <p className="cart__checkout-paragraph">
                    Wartość zamówienia: <span>{totalPrice} zł</span>
                  </p>
                  <p className="cart__checkout-paragraph">
                    Udzielony rabat: <span>{discount}%</span>
                  </p>
                  <p className="cart__checkout-paragraph">
                    Razem do zapłaty: <span>{totalPriceAfterDiscount} zł</span>
                  </p>
                  <div className="cart__checkout-button-wrapper">
                    {this.state.inputVisible
                      ? this.renderDiscountInput()
                      : null}
                    <button
                      className="cart__checkout-button cart__checkout-button--discount"
                      onClick={this.handleToggleInput}
                    >
                      Kod rabatowy
                    </button>
                    <button
                      className="cart__checkout-button cart__checkout-button--submit"
                      onClick={this.showCheckoutModal}
                    >
                      Złóż zamówienie
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <Row />
        {this.state.checkoutModalVisible ? checkoutModal : null}
      </Container>
    );
  }
}

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
