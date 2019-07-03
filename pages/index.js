import React from 'react';
import { withRouter } from 'next/router';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Layout from '../client/components/Layout/Layout';
import SortMenu from '../client/components/SortMenu/SortMenu';
import ProductList from '../client/components/ProductList/ProductList';

import data from '../data.json';
import {
  getProducts,
  sortOnLoad,
} from '../client/components/ProductList/ProductListActions';

import { setSortType } from '../client/components/SortMenu/SortMenuActions';

import 'bootstrap-scss/bootstrap-grid.scss';

const Home = () => (
  <Layout>
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
  </Layout>
);

Home.getInitialProps = async ({ store, query }) => {
  await store.dispatch(getProducts(data));
  const { sort_by } = query;
  store.dispatch(sortOnLoad(sort_by));
  store.dispatch(setSortType(sort_by));

  return {};
};
// export default connect(state => state)(Home);
export default withRouter(Home);
