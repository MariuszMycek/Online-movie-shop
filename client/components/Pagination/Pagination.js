import './Pagination.scss';
import ArrowRight from '../Icons/arrow-right.svg';
import ArrowLeft from '../Icons/arrow-left.svg';
import DoubleLeft from '../Icons/double-left.svg';
import DoubleRight from '../Icons/double-right.svg';
import Link from 'next/link';
import { connect } from 'react-redux';

const Pagination = props => {
  const styleClass = 'pagination__list-item';
  const active = props.activePage;
  const items = [];
  const pagesCount = Math.ceil(props.productCount / 6);
  const { sortType } = props;

  const firstPageNumber = active => {
    if (active <= 3) {
      return 1;
    }
    if (active === pagesCount) {
      return active - 4;
    }
    if (pagesCount - active < 2) {
      return pagesCount - 4;
    }
    return active - 2;
  };

  const lastPageNumber = active => {
    if (active <= 3) {
      return 5;
    }
    if (active === pagesCount) {
      return active;
    }
    if (pagesCount - active < 2) {
      return pagesCount;
    }
    return active + 2;
  };

  for (
    let number = firstPageNumber(active);
    number <= lastPageNumber(active);
    number++
  ) {
    items.push(
      <Link href={`/?sort_by=${sortType}&page=${number}`} key={number}>
        <li
          className={
            number === active
              ? `${styleClass} ${styleClass}--active`
              : styleClass
          }
        >
          {number}
        </li>
      </Link>
    );
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {active !== 1 ? (
          <div className="pagination__icon-wrapper">
            <Link href={`/?sort_by=${sortType}&page=1`}>
              <li className="pagination__list-item">
                <DoubleLeft className="pagination__icon pagination__icon--double-arrow" />
              </li>
            </Link>
            <Link href={`/?sort_by=${sortType}&page=${active - 1}`}>
              <li className="pagination__list-item">
                <ArrowLeft className="pagination__icon" />
              </li>
            </Link>
          </div>
        ) : null}

        {items}

        {active !== pagesCount ? (
          <div className="pagination__icon-wrapper">
            <Link href={`/?sort_by=${sortType}&page=${active + 1}`}>
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
