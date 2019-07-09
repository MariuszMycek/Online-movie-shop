import ArrowRight from '../Icons/arrow-right.svg';
import ArrowLeft from '../Icons/arrow-left.svg';
import DoubleLeft from '../Icons/double-left.svg';
import DoubleRight from '../Icons/double-right.svg';
import Link from 'next/link';
import { connect } from 'react-redux';

import './Pagination.scss';

const Pagination = props => {
  const styleClass = 'pagination__list-item';
  const activePage = props.activePage;
  const items = [];
  const pagesCount = Math.ceil(props.productCount / 6);
  const { sortType } = props;

  const firstPageNumber = activePage => {
    if (activePage <= 3) {
      return 1;
    }
    if (activePage === pagesCount) {
      return activePage - 4;
    }
    if (pagesCount - activePage < 2) {
      return pagesCount - 4;
    }
    return activePage - 2;
  };

  const lastPageNumber = activePage => {
    if (activePage <= 3) {
      return 5;
    }
    if (activePage === pagesCount) {
      return activePage;
    }
    if (pagesCount - activePage < 2) {
      return pagesCount;
    }
    return activePage + 2;
  };

  for (
    let number = firstPageNumber(activePage);
    number <= lastPageNumber(activePage);
    number++
  ) {
    items.push(
      <Link href={`/?sort_by=${sortType}&page=${number}`} key={number}>
        <li
          className={
            number === activePage
              ? `${styleClass} ${styleClass}--active`
              : styleClass
          }
          onClick={e => {
            number === activePage ? e.preventDefault() : null;
          }}
        >
          {number}
        </li>
      </Link>
    );
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {activePage !== 1 ? (
          <div className="pagination__icon-wrapper">
            <Link href={`/?sort_by=${sortType}&page=1`}>
              <li className="pagination__list-item">
                <DoubleLeft className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
            <Link href={`/?sort_by=${sortType}&page=${activePage - 1}`}>
              <li className="pagination__list-item">
                <ArrowLeft className="pagination__icon" />
              </li>
            </Link>
          </div>
        ) : null}

        {items}

        {activePage !== pagesCount ? (
          <div className="pagination__icon-wrapper">
            <Link href={`/?sort_by=${sortType}&page=${activePage + 1}`}>
              <li className="pagination__list-item">
                <ArrowRight className="pagination__icon" />
              </li>
            </Link>
            <Link href={`/?sort_by=${sortType}&page=${pagesCount}`}>
              <li className="pagination__list-item">
                <DoubleRight className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
          </div>
        ) : null}
      </ul>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    sortType: state.sortType,
  };
};

export default connect(mapStateToProps)(Pagination);
