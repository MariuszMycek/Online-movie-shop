import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';

import ArrowRight from '../Icons/arrow-right.svg';
import ArrowLeft from '../Icons/arrow-left.svg';
import DoubleLeft from '../Icons/double-left.svg';
import DoubleRight from '../Icons/double-right.svg';

import './Pagination.scss';

const Pagination = ({ activePage, productCount, sortType, phrase }) => {
  // Initial array for pages to display
  const items = [];
  // Calculating of pages count based on items returned from DB
  const pagesCount = Math.ceil(productCount / 6);

  // Calculating first page number to display depending on actually displayed page
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

  // Calculating last page number to display depending on actually displayed page
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

  // Preparing pages to display
  for (
    let number = firstPageNumber(activePage);
    number <= lastPageNumber(activePage);
    number++
  ) {
    // Styles of page number button - for active page and others
    const buttonClass =
      number === activePage
        ? 'pagination__list-item pagination__list-item--active'
        : 'pagination__list-item';
    // Adding pages to pages array
    items.push(
      <Link
        href={`/?sort_by=${sortType}&page=${number}&phrase=${phrase}`}
        key={number}
      >
        <li>
          <button disabled={number === activePage} className={buttonClass}>
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
            <Link href={`/?sort_by=${sortType}&page=1&phrase=${phrase}`}>
              <li className="pagination__list-item">
                <DoubleLeft className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
            <Link
              href={`/?sort_by=${sortType}&page=${activePage -
                1}&phrase=${phrase}`}
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
              href={`/?sort_by=${sortType}&page=${activePage +
                1}&phrase=${phrase}`}
            >
              <li className="pagination__list-item">
                <ArrowRight className="pagination__icon" />
              </li>
            </Link>
            <Link
              href={`/?sort_by=${sortType}&page=${pagesCount}&phrase=${phrase}`}
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
