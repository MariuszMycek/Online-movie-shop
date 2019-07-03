import React from 'react';
import './Layout.scss';

import Head from '../Head';
import Header from '../Header/Header';
import Footer from '../Footer/Footter';

const Layout = ({ children }) => (
  <div>
    <Head title="SloMo movie store" />
    <Header />

    {children}
    <Footer />
  </div>
);

export default Layout;
