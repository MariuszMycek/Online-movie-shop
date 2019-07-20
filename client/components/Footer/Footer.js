import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <Container className="footer__container">
      <div className="footer__text">
        <p>All rights reserved SloMo 2019</p>
      </div>
      <nav className="footer__nav">
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
    </Container>
  </footer>
);

export default Footer;
