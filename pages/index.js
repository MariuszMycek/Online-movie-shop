import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Layout from '../client/components/Layout/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SortMenu from '../client/components/SortMenu/SortMenu';
import ProductList from '../client/components/ProductList/ProductList';

import { getProducts, sortOnLoad } from '../client/redux/productActions';
import {
  setSortType,
  resetSearchedPhrase,
} from '../client/redux/auxiliaryActions';

const Home = () => (
  <Layout>
    <CSSTransition in={true} timeout={500} classNames="fade" appear>
      <main>
        <Container>
          <Row>
            <Col xs="3">
              <aside>
                <SortMenu />
              </aside>
            </Col>
            <Col xs="9">
              <section>
                <ProductList />
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </CSSTransition>
  </Layout>
);

Home.getInitialProps = async ({ store, query }) => {
  if (!store.getState().movies.length) {
    await store.dispatch(getProducts());
    store.dispatch(resetSearchedPhrase());
  }
  const { sort_by } = query;
  store.dispatch(sortOnLoad(sort_by));
  store.dispatch(setSortType(sort_by));

  return {};
};

export default Home;
