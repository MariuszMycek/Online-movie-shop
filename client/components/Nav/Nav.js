import React from 'react';
import Basket from '../icons/basket.svg';
import ActiveLink from '../ActiveLink';
import Link from 'next/link';
import './Nav.scss';

const Nav = () => (
  <nav>
    <div className="navbar container">
      <Link href="/">
        <div className="navbar__logo">
          <img src="/static/assets/images/logo.png" alt="logo" />
        </div>
      </Link>

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
    </div>
  </nav>
);

export default Nav;
