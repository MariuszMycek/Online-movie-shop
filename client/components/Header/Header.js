import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import ActiveLink from '../ActiveLink';

import Container from 'react-bootstrap/Container';
import SearchBox from '../SearchBox/SearchBox';
import { Emphatic } from 'react-burgers';

import Basket from '../Icons/basket.svg';

import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: window.pageYOffset,
      headerScrolled: false,
      mobileMenuVisible: false,
    };
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener('scroll', this.debounced);
    this.handleScroll();
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounced);
    this.debounced.cancel();
  }

  // Add debounce for better performance
  debounced = debounce(() => this.handleScroll(), 50, {
    maxWait: 500,
  });

  handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    const headerScrolled = currentScrollPosition > 10;

    this.setState({
      scrollPosition: currentScrollPosition,
      headerScrolled,
    });
  };

  toggleMenu = () =>
    this.setState({ mobileMenuVisible: !this.state.mobileMenuVisible });

  closeMenu = () => this.setState({ mobileMenuVisible: false });

  render() {
    const headerClass = () => {
      if (this.state.headerScrolled && !this.state.mobileMenuVisible) {
        return 'header header--scrolled';
      }
      if (this.state.mobileMenuVisible) {
        return 'header header--mobile-active';
      }
      return 'header';
    };

    const navbarClass = this.state.mobileMenuVisible
      ? 'navbar navbar--visible'
      : 'navbar';

    return (
      <header className={headerClass()} onClick={this.toggleMenu}>
        <Emphatic
          className="header__hamburger"
          color="#df2021"
          borderRadius={5}
          onClick={this.toggleMenu}
          active={this.state.mobileMenuVisible}
        />
        <Container
          className="header__container"
          onClick={e => e.stopPropagation()}
        >
          <Link href="/">
            <div className="header__logo">
              <img src="/static/assets/images/logo.png" alt="logo" />
            </div>
          </Link>
          <nav className={`header__navbar ${navbarClass}`}>
            <ul className="navbar__list">
              <li className="navbar__list-item">
                <SearchBox closeMenu={this.closeMenu} />
              </li>
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

Header.propTypes = {
  amountOfitemsInCart: PropTypes.number,
};

const mapStateToProps = state => ({
  amountOfitemsInCart: state.cart.products.length,
});

export default connect(mapStateToProps)(Header);
