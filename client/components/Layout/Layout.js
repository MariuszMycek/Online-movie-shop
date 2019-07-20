import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Head from '../Head';
import Footer from '../Footer/Footer';

const Header = dynamic(import('../Header/Header'), { ssr: false });

const Layout = ({ children }) => (
  <div>
    <Head title="SloMo movie store" />
    <Header />

    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
