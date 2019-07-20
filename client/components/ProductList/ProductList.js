import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../redux/cartActions';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Pagination from '../Pagination/Pagination';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ProductList.scss';

const ProductList = ({ movies, addToCart, router, products, auxiliary }) => {
  const activePage = +router.query.page || 1;

  return (
    <div className="products">
      {!router.query.phrase ? (
        <div>
          <p className="products__number-of-films">
            Znaleziono filmów: <span>{auxiliary.resultCount}</span>
          </p>
        </div>
      ) : (
        <div className="products__search-info">
          <p className="products_search-result-info">
            Znaleziono <span>{auxiliary.resultCount}</span> filmów dla frazy{' '}
            <span>"{router.query.phrase}"</span>
          </p>
        </div>
      )}
      <Row className="products__product-list">
        {movies.map((element, i) => {
          const productInCart = products.find(
            cartElement => element.id === cartElement.product.id
          );
          return (
            <Col lg="6" className="products__list-item" key={i}>
              <TransitionGroup component={null}>
                <CSSTransition key={element.id} timeout={500} classNames="fade">
                  <div className="products__product-card-wrapper">
                    <Row>
                      <Col xs="12" sm="6">
                        <div className="products__image">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${
                              element.poster_path
                            }`}
                            alt={element.original_title}
                          />
                          <Link href={`/product?product_id=${element.id}`}>
                            <div className="products__image-overlay">
                              <div className="products__overlay-text-box">
                                Szczegóły
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                      <Col xs="12" sm="6">
                        <div className="products__product-decription-wrapper">
                          <div className="products__product-description">
                            <h4 className="products__desc-title">
                              {element.original_title}
                            </h4>
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
                          </div>
                          <div className="products__action">
                            <p className="products__price">
                              {element.price} zł
                            </p>
                            <button
                              className="products__add-to-cart-button"
                              disabled={productInCart}
                              onClick={() => addToCart(element)}
                              title={
                                productInCart
                                  ? 'Film już jest w koszyku!'
                                  : null
                              }
                            >
                              Do koszyka
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </Col>
          );
        })}
      </Row>

      <Pagination
        productCount={auxiliary.resultCount}
        activePage={activePage}
      />
    </div>
  );
};

ProductList.propTypes = {
  movies: PropTypes.array,
  router: PropTypes.object,
  addToCart: PropTypes.func,
  products: PropTypes.array,
  auxiliary: PropTypes.object,
};

const mapStateToProps = state => ({
  movies: state.movies,
  products: state.cart.products,
  auxiliary: state.auxiliary,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CartActions }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductList)
);
