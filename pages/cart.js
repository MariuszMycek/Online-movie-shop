import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Layout from '../client/components/Layout/Layout';
import Cart from '../client/components/Cart/Cart';

const CartPage = () => (
  <Layout>
    <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <main>
        <Cart />
      </main>
    </CSSTransition>
  </Layout>
);

export default CartPage;
