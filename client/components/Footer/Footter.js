import React from 'react';
import Link from 'next/link';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className=" container footer__container">
      <div className="footer__text">
        <p>All right reserved SloMo 2019</p>
      </div>
      <nav>
        <ul className="footer__list">
          <li className="footer__list-item">
            <Link href="/">
              <a className="footer__link">HOME</a>
            </Link>
          </li>
          <li className="footer__list-item">
            <Link href="/faq">
              <a className="footer__link">FAQ</a>
            </Link>
          </li>
          <li className="footer__list-item">
            <Link href="/rules">
              <a className="footer__link">REGULAMIN</a>
            </Link>
          </li>
          <li className="footer__list-item">
            <Link href="/contact">
              <a className="footer__link">KONTAKT</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
