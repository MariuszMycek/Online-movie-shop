import React from 'react';
import './Layout.scss';

import Head from '../Head';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footter';

const Layout = ({ children }) => (
  <div>
    <Head title="Movie shop" />
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
