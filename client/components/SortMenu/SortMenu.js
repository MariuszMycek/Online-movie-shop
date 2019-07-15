import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';

import * as sortTypeActions from '../../redux/auxiliaryActions';

import './SortMenu.scss';

const SortMenu = props => {
  const styleClass = 'sort-menu__option';
  return (
    <div className="sort-menu">
      <h3 className="sort-menu__header">Sortuj:</h3>
      <ul className="sort-menu__sorting-options">
        <Link href={`/?sort_by=name_asc&page=1&phrase=${props.phrase}`}>
          <li
            className={
              props.sortType === 'name_asc'
                ? `${styleClass} ${styleClass}--active`
                : styleClass
            }
          >
            Tytuł A-Z
          </li>
        </Link>
        <Link href={`/?sort_by=name_desc&page=1&phrase=${props.phrase}`}>
          <li
            className={
              props.sortType === 'name_desc'
                ? `${styleClass} ${styleClass}--active`
                : styleClass
            }
          >
            Tytuł Z-A
          </li>
        </Link>
        <Link href={`/?sort_by=price_asc&page=1&phrase=${props.phrase}`}>
          <li
            className={
              props.sortType === 'price_asc'
                ? `${styleClass} ${styleClass}--active`
                : styleClass
            }
          >
            Cena rosnąco
          </li>
        </Link>
        <Link href={`/?sort_by=price_desc&page=1&phrase=${props.phrase}`}>
          <li
            className={
              props.sortType === 'price_desc'
                ? `${styleClass} ${styleClass}--active`
                : styleClass
            }
          >
            Cena malejąco
          </li>
        </Link>
      </ul>
    </div>
  );
};

SortMenu.propTypes = {
  phrase: PropTypes.string,
  sortType: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    sortType: state.auxiliary.sortType,
    phrase: state.auxiliary.searchedPhrase,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...sortTypeActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortMenu);
