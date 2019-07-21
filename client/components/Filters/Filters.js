import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router, { withRouter } from 'next/router';

import { setFilters, resetFilter } from '../../redux/auxiliaryActions';

import Form from 'react-bootstrap/Form';

import './Filters.scss';

const Filters = ({
  years,
  genres,
  yearFilter,
  genreFilter,
  resetFilter,
  setFilters,
  router,
}) => {
  const { phrase = '' } = router.query;
  const sortBy = router.query.sort_by || 'noSort';

  // handle change of checkbox
  const handleChange = (value, type, e) => {
    // Getting filters from store
    const filters = {
      yearFilter,
      genreFilter,
    };
    let newFilters;

    // Adding filter to array when checked
    if (e.target.checked) {
      newFilters = { ...filters, [type]: [...filters[type], value] };
    }
    // Removing filter from array when unchecked
    else {
      newFilters = {
        ...filters,
        [type]: filters[type].filter(element => element !== value),
      };
    }
    // Updating the filters in store
    setFilters(newFilters);
    // Redirecting to the first page
    Router.push(`/?sort_by=${sortBy}&page=1&phrase=${phrase}`);
  };

  const resetFilters = type => {
    // Reseting filters in store
    resetFilter(type);
    // Redirecting to the first page
    Router.push(`/?sort_by=${sortBy}&page=1&phrase=${phrase}`);
  };

  return (
    <div className="filters">
      <div className="filters__release-year-filter">
        <div className="filters__header-wrapper">
          <h4>Rok wydania:</h4>
          <button
            className="filters__reset-button"
            onClick={() => resetFilters('yearFilter')}
          >
            Reset
          </button>
        </div>
        <Form className="filters__form filters__form--years">
          {years.map(year => (
            <Form.Check
              className="filters__checkbox"
              type="checkbox"
              label={year}
              key={year}
              custom
              id={`checkbox-${year}`}
              onChange={e => handleChange(year, 'yearFilter', e)}
              checked={yearFilter.includes(year)}
            />
          ))}
        </Form>
      </div>
      <div className="filters__release-year-filter">
        <div className="filters__header-wrapper">
          <h4>Gatunek:</h4>
          <button
            className="filters__reset-button"
            onClick={() => resetFilters('genreFilter')}
          >
            Reset
          </button>
        </div>
        <Form className="filters__form filters__form--genres">
          {genres.map(genre => (
            <Form.Check
              className="filters__checkbox"
              type="checkbox"
              label={genre}
              key={genre}
              custom
              id={`checkbox-${genre}`}
              onChange={e => handleChange(genre, 'genreFilter', e)}
              checked={genreFilter.includes(genre)}
            />
          ))}
        </Form>
      </div>
    </div>
  );
};

Filters.propTypes = {
  years: PropTypes.array,
  genres: PropTypes.array,
  setFilters: PropTypes.func,
  resetFilter: PropTypes.func,
  yearFilter: PropTypes.array,
  genreFilter: PropTypes.array,
  router: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    years: state.auxiliary.yearsCategories,
    genres: state.auxiliary.genresCategories,
    yearFilter: state.auxiliary.yearFilter,
    genreFilter: state.auxiliary.genreFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilters, resetFilter }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filters)
);
