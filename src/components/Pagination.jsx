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
        <div
          className={classnames('page-item', {
            active: i === current,
          })}
          key={i}
          onClick={() => props.onChange(i)}
        >
          <span className={'page-link'}>
            {i}
          </span>
        </div>
      );
    }

    return buttons.length > 1 ? buttons : null;
  }

  return (
    <nav
      className={classnames('d-flex justify-content-center', props.className)}
    >
      <div className={'pagination'}>
        <div
          className={classnames('page-item', {
            'disabled no-pointer-events': !show.prev(),
          })}
          onClick={() => props.onChange(current - 1)}
        >
          <span className={'page-link'}>
            {'Prev'}
          </span>
        </div>

        {show.first() ? (
          <div
            className={'page-item'}
            onClick={() => props.onChange(1)}
          >
            <span className={'page-link'}>
              {1}
            </span>
          </div>
        ) : null}

        {show.first() ? (
          <div
            className={'page-item disabled'}
          >
            <span className={'page-link'}>
              {'...'}
            </span>
          </div>
        ) : null}

        {renderButtons()}

        {show.last() ? (
          <div
            className={'page-item disabled'}
          >
            <span className={'page-link'}>
              {'...'}
            </span>
          </div>
        ) : null}

        {show.last() ? (
          <div
            className={'page-item'}
            onClick={() => props.onChange(pages)}
          >
            <span className={'page-link'}>
              {pages}
            </span>
          </div>
        ) : null}

        <div
          className={classnames('page-item', {
            'disabled no-pointer-events': !show.next(),
          })}
          onClick={() => props.onChange(current + 1)}
        >
          <span className={'page-link'}>
            {'Next'}
          </span>
        </div>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  pages: PropTypes.number.isRequired,
  spread: PropTypes.number,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  spread: 4,
  onChange: () => undefined,
  className: '',
};

export default Pagination;
