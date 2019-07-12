import React from 'react';
import { CSSTransition } from 'react-transition-group';

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

Product.getInitialProps = async ({ store, query }) => {
  const moviesInStore = store.getState().movies;
  const isMovieInStore = moviesInStore.find(
    movie => movie.id === +query.product_id
  );
  if (!isMovieInStore) {
    await store.dispatch(getProducts());
  }

  return {};
};

export default Product;
