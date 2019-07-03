import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sortActions from '../ProductList/ProductListActions';
import * as sortTypeActions from '../SortMenu/SortMenuActions';

import './SortMenu.scss';

const SortMenu = props => {
  return (
    <div className="sort-menu">
      <h3 className="sort-menu__header">Sortuj:</h3>
      <ul className="sort-menu__sorting-options">
        <li
          className="sort-menu__option"
          onClick={() => {
            props.setSortType('name_asc');
            props.sortAlphabetically();
          }}
        >
          Nazwa A-Z
        </li>
        <li
          className="sort-menu__option"
          onClick={() => {
            props.setSortType('name_desc');
            props.sortAlphabeticallyReversed();
          }}
        >
          Nazwa Z-A
        </li>
        <li
          className="sort-menu__option"
          onClick={() => {
            props.setSortType('price_asc');
            props.sortByPriceAscending();
          }}
        >
          Cena rosnąco
        </li>
        <li
          className="sort-menu__option"
          onClick={() => {
            props.setSortType('price_desc');
            props.sortByPriceDescending();
          }}
        >
          Cena malejąco
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...sortActions, ...sortTypeActions }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(SortMenu);
