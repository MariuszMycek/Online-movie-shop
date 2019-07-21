import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// Disabling SSR because of window object using in FilterButton component
const FilterButton = dynamic(import('../FilterButton/FilterButton'), {
  ssr: false,
});

import './Aside.scss';

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asideVisible: false,
    };
  }

  // Toggling aside menu on mobile
  toggleAside = () => {
    this.setState({ asideVisible: !this.state.asideVisible });
  };

  render() {
    const { children } = this.props;

    // Aside class depending on state
    const asideClass = this.state.asideVisible
      ? 'aside aside--visible'
      : 'aside';
    return (
      <aside className={asideClass} onClick={this.toggleAside}>
        <div
          className="aside__children-wrapper"
          onClick={e => e.stopPropagation()}
        >
          <FilterButton
            toggleAside={this.toggleAside}
            asideVisible={this.state.asideVisible}
          />
          {children}
        </div>
      </aside>
    );
  }
}

Aside.propTypes = {
  children: PropTypes.node,
};

export default Aside;
