import React from 'react';

import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <img className="spinner__img" src="static/spinner.svg" alt="" />
    </div>
  );
};

export default Spinner;
