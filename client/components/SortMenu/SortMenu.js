import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';

import * as sortTypeActions from '../../redux/auxiliaryActions';

import './SortMenu.scss';

const SortMenu = ({ phrase, sortType }) => {
  // Setting style classes for active and not active links
  const styleClass = 'sort-menu__option';
  const styleClsssActive = `${styleClass} ${styleClass}--active`;
  
  return (
    <div className="sort-menu">
      <h4 className="sort-menu__header">Sortuj:</h4>
      <ul className="sort-menu__sorting-options">
        <Link href={`/?sort_by=name_asc&page=1&phrase=${phrase}`}>
          <li
            className={sortType === 'name_asc' ? styleClsssActive : styleClass}
          >
            Tytuł A-Z
          </li>
        </Link>
        <Link href={`/?sort_by=name_desc&page=1&phrase=${phrase}`}>
          <li
            className={sortType === 'name_desc' ? styleClsssActive : styleClass}
          >
            Tytuł Z-A
          </li>
        </Link>
        <Link href={`/?sort_by=price_asc&page=1&phrase=${phrase}`}>
          <li
            className={sortType === 'price_asc' ? styleClsssActive : styleClass}
          >
            Cena rosnąco
          </li>
        </Link>
        <Link href={`/?sort_by=price_desc&page=1&phrase=${phrase}`}>
          <li
            className={
              sortType === 'price_desc' ? styleClsssActive : styleClass
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
