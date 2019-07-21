import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Layout from '../client/components/Layout/Layout';
import Aside from '../client/components/Aside/Aside';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SortMenu from '../client/components/SortMenu/SortMenu';
import ProductList from '../client/components/ProductList/ProductList';
import Filters from '../client/components/Filters/Filters';

import { getMovies } from '../client/redux/productActions';
import {
  setSortType,
  setSearchedPhrase,
  setResultCount,
  setCategories,
} from '../client/redux/auxiliaryActions';

import callApi from '../client/util/apiCaller';

const Home = () => (
  <Layout>
    <CSSTransition in={true} timeout={500} classNames="fade" appear>
      <main>
        <Container>
          <Row>
            <Col xs="12" md="3">
              <Aside>
                <SortMenu />
                <Filters />
              </Aside>
            </Col>
            <Col xs="12" md="9">
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
  const { sort_by = 'noSort', page = 1, phrase = '' } = query;

  const auxiliary = store.getState().auxiliary;

  // Checking if categories for filters are in store
  if (!auxiliary.yearsCategories && !auxiliary.genresCategories) {
    // if not - fetching categories from DB
    await callApi('filter').then(res => {
      // Sending fetched categories to store
      store.dispatch(setCategories(res.years, res.genres));
    });
  }
  // Fetching data from DB
  await callApi(`home/${sort_by}/${page}/${phrase}`, 'SEARCH', {
    // filters inside body
    years: auxiliary.yearFilter,
    genres: auxiliary.genreFilter,
  })
    .then(res => {
      // Sending movies for actual page to store
      store.dispatch(getMovies(res.movies));
      // Sending result count to store
      store.dispatch(setResultCount(res.count));
    })
    .then(() => {
      // Setting sorting type in store
      store.dispatch(setSortType(sort_by));
      // Setting searched phrase in store
      store.dispatch(setSearchedPhrase(phrase));
    });

  return {};
};

export default Home;
