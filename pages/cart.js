import React from 'react';
import { connect } from 'react-redux';

import Layout from '../client/components/Layout/Layout';
import Cart from '../client/components/Cart/Cart';

const CartPage = () => (
  <Layout>
    <main>
      <Cart />
    </main>
  </Layout>
);

// export default connect(state => state)(Home);
export default CartPage;
