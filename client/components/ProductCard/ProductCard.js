import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../redux/cartActions';

import GoBackButon from '../GoBackButton/GoBackButton';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ProductCard.scss';

const ProductCard = ({ movies, router, addToCart, productsInCart }) => {
  const productId = +router.query.product_id;
  const product = movies.find(movie => movie.id === productId);
  const productInCart = productsInCart.find(
    cartElement => productId === cartElement.product.id
  );

  return (
    <Container>
      <GoBackButon />
      <div className="product-card">
        {product ? (
          <Row>
            <Col md="6" lg="5">
              <div className="product-card__image">
                <img
                  src={`https://image.tmdb.org/t/p/w500${product.poster_path}`}
                  alt={product.original_title}
                />
              </div>
            </Col>
            <Col md="6" lg="7">
              <div className="product-card__product-decription-wrapper">
                <div className="product-card__product-description">
                  <h2 className="product-card__title">
                    {product.original_title}
                  </h2>
                  <p className="product-card__desc-element">
                    Gatunek:{' '}
                    {Array.isArray(product.genres_data)
                      ? product.genres_data.join(', ')
                      : product.genres_data}
                  </p>
                  <p className="product-card__desc-element">
                    Rok wydania: {product.release_year}
                  </p>
                  <p className="product-card__desc-element">
                    Czas trwania: {product.time_str}
                  </p>
                  <p className="product-card__overview">{product.overview}</p>
                  <p className="product-card__price">
                    Cena: {product.price} zł
                  </p>
                </div>
                <button
                  className="product-card__button"
                  disabled={productInCart}
                  onClick={() => addToCart(product)}
                >
                  Dodaj do koszyka
                </button>
                {productInCart ? (
                  <span className="product-card__cart-info">
                    Film został dodany do koszyka
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
        ) : (
          <p className="product-card__not-found-info">
            Przykro nam, ale szukanego filmu nie ma w naszej bazie...
          </p>
        )}
      </div>
    </Container>
  );
};

ProductCard.propTypes = {
  movies: PropTypes.array,
  router: PropTypes.object,
  addToCart: PropTypes.func,
  productsInCart: PropTypes.array,
};

const mapStateToProps = state => ({
  movies: state.movies,
  productsInCart: state.cart.products,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CartActions }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductCard)
);
