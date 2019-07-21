import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { getMovies } from '../client/redux/productActions';

import ProductCard from '../client/components/ProductCard/ProductCard';
import Layout from '../client/components/Layout/Layout';

import callApi from '../client/util/apiCaller';

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

  // Checking if movie is in store for faster loading
  const isMovieInStore = moviesInStore.find(
    movie => movie.id === +query.product_id
  );
  // If not - fetching data from server
  if (!isMovieInStore) {
    await callApi(`product/${query.product_id}`).then(res => {
      store.dispatch(getMovies(res));
    });
  }

  return {};
};

export default Product;
