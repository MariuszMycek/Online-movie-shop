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

  if (!auxiliary.yearsCategories && !auxiliary.genresCategories) {
    await callApi('filter').then(res => {
      store.dispatch(setCategories(res.years, res.genres));
    });
  }
  await callApi(`home/${sort_by}/${page}/${phrase}`, 'SEARCH', {
    years: auxiliary.yearFilter,
    genres: auxiliary.genreFilter,
  })
    .then(res => {
      store.dispatch(getMovies(res.movies));
      store.dispatch(setResultCount(res.count));
    })
    .then(() => {
      store.dispatch(setSortType(sort_by));
      store.dispatch(setSearchedPhrase(phrase));
    });

  return {};
};

export default Home;
