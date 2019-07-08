import React from 'react';

import Layout from '../client/components/Layout/Layout';

import data from '../data.json';
import { getProducts } from '../client/redux/productActions';

import ProductCard from '../client/components/ProductCard/ProductCard';

const Product = () => {
  return (
    <Layout>
      <main>
        <ProductCard />
      </main>
    </Layout>
  );
};

Product.getInitialProps = async ({ store }) => {
  await store.dispatch(getProducts(data));

  return {};
};

export default Product;
