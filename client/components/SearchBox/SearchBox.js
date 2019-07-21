import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import { setSearchedPhrase } from '../../redux/auxiliaryActions';

import SearchIcon from '../Icons/search.svg';

import './SearchBox.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      inputVisible: false,
    };
  }
  // Handle change of input value
  handleOnchange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // Handle of search form submit
  handleSubmit = e => {
    // preventing page reload
    e.preventDefault();
    // Checking if there is any content in the input field
    if (this.state.inputValue) {
      // Redirecting to home page with searched phrase in query parameter
      Router.push(`/?phrase=${this.state.inputValue}`);
      // Sending searched phrase to store
      this.props.setSearchedPhrase(this.state.inputValue);
      // Reseting input value
      this.setState({ inputValue: '' });
    }
  };

  showInput = () => {
    // Focusing input (after search button click)
    this.searchInput.focus();
    // Updating state 
    this.setState({ inputVisible: true });
  };

  hideInput = () => {
    // Updating state
    this.setState({ inputVisible: false });
    // Closing mobile menu 
    this.props.closeMenu();
  };

  render() {
    const { inputVisible, inputValue } = this.state;

    const inputClass = !inputVisible
      ? 'search-box__input'
      : 'search-box__input search-box__input--active';

    return (
      <form className="search-box" onSubmit={this.handleSubmit}>
        <input
          className={inputClass}
          type="text"
          onChange={this.handleOnchange}
          value={inputValue}
          autoFocus={inputVisible}
          placeholder={inputVisible ? 'Szukaj filmów' : null}
          ref={input => (this.searchInput = input)}
        />
        <button
          className="search-box__button"
          onClick={inputVisible ? this.hideInput : this.showInput}
        >
          <SearchIcon className="search-box__icon" />
        </button>
      </form>
    );
  }
}

SearchBox.propTypes = {
  setSearchedPhrase: PropTypes.func,
  closeMenu: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSearchedPhrase }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SearchBox);
