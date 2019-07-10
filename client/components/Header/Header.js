import React, { Component } from 'react';
import Basket from '../Icons/basket.svg';
import ActiveLink from '../ActiveLink';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';

import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: window.pageYOffset,
      headerShadow: false,
    };
  }

  // Add debounce for better performance
  debounced = debounce(() => this.handleScroll(), 50, {
    maxWait: 500,
  });

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener('scroll', this.debounced);
    this.handleScroll();
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounced);
  }

  handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    const headerShadow = currentScrollPosition > 10;

    this.setState({
      scrollPosition: currentScrollPosition,
      headerShadow,
    });
  };

  render() {
    const headerClass = this.state.headerShadow
      ? 'header header--with-shadow'
      : 'header';
    return (
      <header className={headerClass}>
        <Container className="header__container">
          <Link href="/">
            <div className="header__logo">
              <img src="/static/assets/images/logo.png" alt="logo" />
            </div>
          </Link>
          <nav className="header__navbar navbar">
            <ul className="navbar__list">
              <li className="navbar__list-item">
                <ActiveLink href="/" className="navbar__link">
                  HOME
                </ActiveLink>
              </li>
              <li className="navbar__list-item">
                <ActiveLink href="/faq" className="navbar__link">
                  FAQ
                </ActiveLink>
              </li>
              <li className="navbar__list-item">
                <ActiveLink href="/rules" className="navbar__link">
                  REGULAMIN
                </ActiveLink>
              </li>
              <li className="navbar__list-item">
                <ActiveLink href="/contact" className="navbar__link">
                  KONTAKT
                </ActiveLink>
              </li>
              <li className="navbar__list-item">
                <ActiveLink href="/cart" className="navbar__link">
                  <Basket className="navbar__basket-icon" />
                  {this.props.amountOfitemsInCart > 0 ? (
                    <span className="navbar__cart-items-amount">
                      ({this.props.amountOfitemsInCart})
                    </span>
                  ) : null}
                </ActiveLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  amountOfitemsInCart: state.cart.products.length,
});

export default connect(mapStateToProps)(Header);
