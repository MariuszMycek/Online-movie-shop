import React from 'react';
import dynamic from 'next/dynamic';

import Head from '../Head';
import Footer from '../Footer/Footter';

const Header = dynamic(import('../Header/Header'), { ssr: false });
const Layout = ({ children }) => (
  <div>
    <Head title="SloMo movie store" />
    <Header />

    {children}
    <Footer />
  </div>
);

export default Layout;
