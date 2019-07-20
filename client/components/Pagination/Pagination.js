import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';

import ArrowRight from '../Icons/arrow-right.svg';
import ArrowLeft from '../Icons/arrow-left.svg';
import DoubleLeft from '../Icons/double-left.svg';
import DoubleRight from '../Icons/double-right.svg';

import './Pagination.scss';

const Pagination = props => {
  const styleClass = 'pagination__list-item';
  const activePage = props.activePage;
  const items = [];
  const pagesCount = Math.ceil(props.productCount / 6);
  const { sortType } = props;

  const firstPageNumber = page => {
    if (page <= 3) {
      return 1;
    }
    if (page === pagesCount) {
      return page - 4;
    }
    if (pagesCount - page < 2) {
      return pagesCount - 4;
    }
    return page - 2;
  };

  const lastPageNumber = page => {
    if (pagesCount < 5) {
      return pagesCount;
    }
    if (page <= 3) {
      return 5;
    }
    if (page === pagesCount) {
      return page;
    }
    if (pagesCount - page < 2) {
      return pagesCount;
    }
    return page + 2;
  };

  for (
    let number = firstPageNumber(activePage);
    number <= lastPageNumber(activePage);
    number++
  ) {
    items.push(
      <Link
        href={`/?sort_by=${sortType}&page=${number}&phrase=${props.phrase}`}
        key={number}
      >
        <li>
          <button
            disabled={number === activePage}
            className={
              number === activePage
                ? `${styleClass} ${styleClass}--active`
                : styleClass
            }
          >
            {number}
          </button>
        </li>
      </Link>
    );
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {activePage !== 1 ? (
          <div className="pagination__icon-wrapper">
            <Link href={`/?sort_by=${sortType}&page=1&phrase=${props.phrase}`}>
              <li className="pagination__list-item">
                <DoubleLeft className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
            <Link
              href={`/?sort_by=${sortType}&page=${activePage - 1}&phrase=${
                props.phrase
              }`}
            >
              <li className="pagination__list-item">
                <ArrowLeft className="pagination__icon" />
              </li>
            </Link>
          </div>
        ) : null}

        {items}

        {activePage !== pagesCount && pagesCount !== 0 ? (
          <div className="pagination__icon-wrapper">
            <Link
              href={`/?sort_by=${sortType}&page=${activePage + 1}&phrase=${
                props.phrase
              }`}
            >
              <li className="pagination__list-item">
                <ArrowRight className="pagination__icon" />
              </li>
            </Link>
            <Link
              href={`/?sort_by=${sortType}&page=${pagesCount}&phrase=${
                props.phrase
              }`}
            >
              <li className="pagination__list-item">
                <DoubleRight className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  productCount: PropTypes.number,
  sortType: PropTypes.string,
  phrase: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    sortType: state.auxiliary.sortType,
    phrase: state.auxiliary.searchedPhrase,
  };
};

export default connect(mapStateToProps)(Pagination);
