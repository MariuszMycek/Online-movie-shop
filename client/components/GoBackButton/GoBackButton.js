import Router from 'next/router';
import ArrowLeft from '../Icons/arrow-left.svg';

import './GoBackButton.scss';

export default function BackButton() {
  return (
    <div onClick={() => Router.back()} className="go-back">
      <ArrowLeft className="go-back__icon" />
      <span className="go-back__text">Powrót</span>
    </div>
  );
}
