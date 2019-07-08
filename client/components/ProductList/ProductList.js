import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';

import Pagination from '../Pagination/Pagination';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap-scss/bootstrap-grid.scss';
import './ProductList.scss';

const ProductList = props => {
  const { movies } = props;
  const activePage = Number(props.router.query.page) || 1;
  const firstIndexToRender = activePage * 6 - 6;
  const lastIndexToRender = activePage * 6 - 1;
  return (
    <div className="products">
      <Row className="products__product-list">
        {movies.map((element, i) => {
          if (i >= firstIndexToRender && i <= lastIndexToRender)
            return (
              <Col xl="6" className="products__list-item" key={i}>
                <div className="products__product-card-wrapper">
                  <Row>
                    <Col xl="6">
                      <div className="products__image">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${
                            element.poster_path
                          }`}
                          alt={element.original_title}
                        />
                        <div className="products__image-overlay">
                          <Link href={`/product?product_id=${element.id}`}>
                            <button className="products__button">Zobacz</button>
                          </Link>
                        </div>
                      </div>
                    </Col>
                    <Col xl="6">
                      <div className="products__product-decription-wrapper">
                        <div className="products__product-description">
                          <h4>{element.original_title}</h4>
                          <p className="products__desc-element">
                            Gatunek:{' '}
                            {Array.isArray(element.genres_data)
                              ? element.genres_data.join(', ')
                              : element.genres_data}
                          </p>
                          <p className="products__desc-element">
                            Rok wydania: {element.release_year}
                          </p>
                          <p className="products__desc-element">
                            Czas trwania: {element.time_str}
                          </p>
                          <p>Cena: {element.price} zł</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
        })}
      </Row>
      <Pagination productCount={movies.length} activePage={activePage} />
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.movies,
});

export default withRouter(connect(mapStateToProps)(ProductList));
