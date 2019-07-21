import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from '../Icons/filter.svg';

import debounce from 'lodash/debounce';

import './FilterButton.scss';

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: window.pageYOffset,
      buttonVisible: false,
    };
  }

  componentDidMount = () => {
    // Adds an event listener when the component is mount.
    window.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    // Remove the event listener when the component is unmount.
    window.removeEventListener('scroll', this.onScroll);
    // Clearing the timeouts
    this.hideButton.cancel();
    this.showButton.cancel();
  };

  // Container for functions used in adding and removing event listeners
  onScroll = () => {
    this.showButton();
    this.hideButton();
  };

  // Add debounce for better performance
  showButton = debounce(() => this.handleScroll(), 1500, {
    leading: true,
    trailing: false,
  });

  hideButton = debounce(() => this.setState({ buttonVisible: false }), 3000);

  // Handle scroll behavior
  handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    const buttonVisible = currentScrollPosition !== this.state.scrollPosition; // true - false
    // Updating state
    this.setState({
      scrollPosition: currentScrollPosition,
      buttonVisible,
    });
  };

  render() {
    const { toggleAside, asideVisible } = this.props;

    // Filter Button class depending on state
    const filterButtonClass =
      this.state.buttonVisible || asideVisible
        ? 'filter-button'
        : 'filter-button filter-button--not-active';
    return (
      <button className={filterButtonClass} onClick={toggleAside}>
        <div className="filter-button__box">
          <Filter className="filter-button__icon" />
        </div>
      </button>
    );
  }
}

FilterButton.propTypes = {
  toggleAside: PropTypes.func,
  asideVisible: PropTypes.bool,
};

export default FilterButton;
