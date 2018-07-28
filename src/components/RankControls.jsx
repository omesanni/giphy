import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

const RankControls = props => (
  <div
    className={classnames('rank-controls', props.className)}
  >
    <FontAwesomeIcon
      icon={faArrowUp}
      className={'rank-controls__up mr-3'}
      onClick={() => props.onUpvote()}
    />

    <span className={'badge badge-pill badge-secondary'}>
      {props.score}
    </span>

    <FontAwesomeIcon
      icon={faArrowDown}
      className={'rank-controls__down ml-3'}
      onClick={() => props.onDownvote()}
    />
  </div>
);

RankControls.propTypes = {
  className: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

RankControls.defaultProps = {
  className: '',
};

export default RankControls;
