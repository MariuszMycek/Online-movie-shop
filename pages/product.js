import React from 'react';

import data from '../data.json';
import { getProducts } from '../client/redux/productActions';

import ProductCard from '../client/components/ProductCard/ProductCard';
import Layout from '../client/components/Layout/Layout';

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
