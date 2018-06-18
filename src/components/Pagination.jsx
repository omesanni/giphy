import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setRange, isWithinRange } from '../utils/lib';

const Pagination = (props) => {
  const { current, pages } = props;
  const range = setRange(current, props.spread, pages);

  // rendering logic
  const show = {
    first: () => (current !== 1 && range.min !== 1),
    prev: () => (current !== 1),
    next: () => (current < pages),
    last: () => (current !== pages && range.max !== pages),
  };

  // render a range of pagination numbers
  function renderButtons() {
    const buttons = [];

    for (let i = range.min; isWithinRange(range, i, pages); i += 1) {
      buttons.push(
        <li
          className={classnames('page-item', {
            'active': i === current,
          })}
          key={i}
          onClick={() => { props.onChange(i); }}
        >
          <span className={'page-link'}>
            {i}
          </span>
        </li>
      );
    }

    return buttons.length > 1 ? buttons : null;
  }

  return (
    <nav
      className={classnames('d-flex justify-content-center', props.className)}
    >
      <ul className={'pagination'}>
        <li
          className={classnames('page-item', {
            'disabled no-pointer-events': !show.prev(),
          })}
          onClick={() => { props.onChange(current - 1); }}
        >
          <span className={'page-link'}>
            {'Prev'}
          </span>
        </li>

        {show.first() ? (
          <li
            className={'page-item'}
            onClick={() => { props.onChange(1); }}
          >
            <span className={'page-link'}>
              {1}
            </span>
          </li>
        ) : null}

        {show.first() ? (
          <li
            className={'page-item disabled'}
          >
            <span className={'page-link'}>
              {'...'}
            </span>
          </li>
        ) : null}

        {renderButtons()}

        {show.last() ? (
          <li
            className={'page-item disabled'}
          >
            <span className={'page-link'}>
              {'...'}
            </span>
          </li>
        ) : null}

        {show.last() ? (
          <li
            className={'page-item'}
            onClick={() => { props.onChange(pages); }}
          >
            <span className={'page-link'}>
              {pages}
            </span>
          </li>
        ) : null}

        <li
          className={classnames('page-item', {
            'disabled no-pointer-events': !show.next(),
          })}
          onClick={() => { props.onChange(current + 1); }}
        >
          <span className={'page-link'}>
            {'Next'}
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  pages: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  spread: 4,
  onChange: () => undefined,
  className: '',
};

export default Pagination;
