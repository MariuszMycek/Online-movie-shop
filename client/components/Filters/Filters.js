import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router, { withRouter } from 'next/router';

import { setFilters, resetFilter } from '../../redux/auxiliaryActions';

import Form from 'react-bootstrap/Form';

import './Filters.scss';

class Filters extends Component {
  handleChange = (value, type, e) => {
    const { sort_by = 'noSort', phrase = '' } = this.props.router.query;
    const filters = {
      yearFilter: this.props.yearFilter,
      genreFilter: this.props.genreFilter,
    };
    let newFilters;

    if (e.target.checked) {
      newFilters = { ...filters, [type]: [...filters[type], value] };
    } else {
      newFilters = {
        ...filters,
        [type]: filters[type].filter(element => element !== value),
      };
    }
    this.props.setFilters(newFilters);
    Router.push(`/?sort_by=${sort_by}&page=1&phrase=${phrase}`);
  };

  isChecked = (type, value) => {
    this.props[type].includes(value) ? true : false;
  };

  resetFilter = type => {
    const { sort_by = 'noSort', phrase = '' } = this.props.router.query;

    this.props.resetFilter(type);
    Router.push(`/?sort_by=${sort_by}&page=1&phrase=${phrase}`);
  };

  render() {
    const { years, genres } = this.props;
    return (
      <div className="filters">
        <div className="filters__release-year-filter">
          <div className="filters__header-wrapper">
            <h4>Rok wydania:</h4>
            <button
              className="filters__reset-button"
              onClick={() => this.resetFilter('yearFilter')}
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
                onChange={e => this.handleChange(year, 'yearFilter', e)}
                checked={this.props.yearFilter.includes(year)}
              />
            ))}
          </Form>
        </div>
        <div className="filters__release-year-filter">
          <div className="filters__header-wrapper">
            <h4>Gatunek:</h4>
            <button
              className="filters__reset-button"
              onClick={() => this.resetFilter('genreFilter')}
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
                onChange={e => this.handleChange(genre, 'genreFilter', e)}
                checked={this.props.genreFilter.includes(genre)}
              />
            ))}
          </Form>
        </div>
      </div>
    );
  }
}

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
