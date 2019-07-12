import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import data from '../../../data.json';

import { searchForMovies, getProducts } from '../../redux/productActions';
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

  handleOnchange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.inputValue) {
      Router.push('/');
      await this.props.getProducts(data);
      this.props.setSearchedPhrase(this.state.inputValue);
      this.props.searchForMovies(this.state.inputValue);
      this.setState({ inputValue: '' });
    }
  };

  showInput = e => {
    this.searchInput.focus();
    this.setState({ inputVisible: true });
  };

  hideInput = e => {
    this.setState({ inputVisible: false });
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { searchForMovies, getProducts, setSearchedPhrase },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(SearchBox);
