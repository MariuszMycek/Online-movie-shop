import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';

import * as sortActions from '../../redux/productActions';
import * as sortTypeActions from '../../redux/auxiliaryActions';

import './SortMenu.scss';

const SortMenu = props => {
  const styleClass = 'sort-menu__option';
  return (
    <div className="sort-menu">
      <h3 className="sort-menu__header">Sortuj:</h3>
      <ul className="sort-menu__sorting-options">
        <Link href={`/?sort_by=name_asc&page=1`}>
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
        <Link href={`/?sort_by=name_desc&page=1`}>
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
        <Link href={`/?sort_by=price_asc&page=1`}>
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
        <Link href={`/?sort_by=price_desc&page=1`}>
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

const mapStateToProps = state => {
  return {
    sortType: state.sortType,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...sortActions, ...sortTypeActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortMenu);
