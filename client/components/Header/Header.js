import React from 'react';
import Basket from '../icons/basket.svg';
import ActiveLink from '../ActiveLink';
import Link from 'next/link';

import './Header.scss';

const Header = () => (
  <header className="header">
    <div className="header__container container">
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
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
