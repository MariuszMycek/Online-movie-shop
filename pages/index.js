import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Layout from '../client/components/Layout/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SortMenu from '../client/components/SortMenu/SortMenu';
import ProductList from '../client/components/ProductList/ProductList';

import { fetchData } from '../client/redux/productActions';
import {
  setSortType,
  setSearchedPhrase,
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
  const { sort_by, page, phrase } = query;
  await store.dispatch(fetchData(sort_by, page, phrase));

  store.dispatch(setSortType(sort_by));
  store.dispatch(setSearchedPhrase(phrase));

  return {};
};

export default Home;
