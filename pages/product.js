import React from 'react';
import { CSSTransition } from 'react-transition-group';

import data from '../data.json';
import { getProducts } from '../client/redux/productActions';

import ProductCard from '../client/components/ProductCard/ProductCard';
import Layout from '../client/components/Layout/Layout';

const Product = () => {
  return (
    <Layout>
      <CSSTransition in={true} timeout={500} classNames="fade" appear>
        <main>
          <ProductCard />
        </main>
      </CSSTransition>
    </Layout>
  );
};

Product.getInitialProps = async ({ store }) => {
  if (!store.getState().movies.length) {
    await store.dispatch(getProducts(data));
  }

  return {};
};

export default Product;
