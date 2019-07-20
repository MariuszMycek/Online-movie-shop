import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

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

  toggleAside = () => {
    this.setState({ asideVisible: !this.state.asideVisible });
  };

  closeAside = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.toggleAside();
  };

  render() {
    const { children } = this.props;
    const asideClass = this.state.asideVisible
      ? 'aside aside--visible'
      : 'aside';
    return (
      <aside className={asideClass} onClick={this.toggleAside}>
        <div className="aside__children-wrapper" onClick={e => e.stopPropagation()}>
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
