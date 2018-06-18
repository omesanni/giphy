import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import numeral from 'numeral';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { formatNumber, saveToLocalStorage } from '../../utils/lib';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import RankControls from '../../components/RankControls';
import Pagination from '../../components/Pagination';
import * as giphyActions from './actions';
import * as modalActions from '../../shared/modals/actions';

export class Giphies extends React.Component {
  constructor() {
    super();

    this.modalId = 'giphy-details';
    this.searchNode = null;
    this.pageLimitOptions = [10, 25, 50];
    this.sortingOptions = ['asc', 'desc'];

    this.state = {
      pageLimit: 25,
      searchVal: '',
      focusedGiphy: null,
      sortDirection: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.renderGiphyCards = this.renderGiphyCards.bind(this);
    this.renderHeaderControls = this.renderHeaderControls.bind(this);
    this.renderGiphyDetailsModal = this.renderGiphyDetailsModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { focusedGiphy } = this.state;

    if (focusedGiphy) {
      const { records: nextRecords } = nextProps.giphies;
      const { records } = this.props.giphies;

      const nextRecord = nextRecords.find(n => (n.id === focusedGiphy.id));
      const record = records.find(g => (g.id === focusedGiphy.id));

      if (!isEqual(record, nextRecord)) {
        this.setState(() => ({ focusedGiphy: nextRecord }));
      }
    }
  }

  /**
   * Handler for performing giphy search
   * @param  {Number}  offset           Page offset
   * @param  {Boolean} paginationFetch  Flag to detect when page number is clicked
   * @return {Promise}
   */
  handleSearch(offset = 0, paginationFetch = false) {
    const { actions } = this.props;
    const { value } = this.searchNode;
    const { sortDirection, pageLimit, searchVal } = this.state;

    // use value saved in state if a page number is clicked else use
    // search input value
    const preferredVal = paginationFetch ? searchVal : value;

    if (!preferredVal) {
      return;
    }

    // query object in the format needed by giphy API
    const query = {
      q: preferredVal,
      limit: pageLimit,
      offset,
    };

    return actions.fetchGiphies(query)
      .then((res) => {
        this.setState(() => ({ searchVal: preferredVal }));

        // sort records after
        if (res.data && sortDirection) {
          actions.sortGiphies(sortDirection);
        }
      });
  }

  /**
   * Upvote or downvote giphy
   * @param  {Object}  giphy    Particular giphy record
   * @param  {Boolean} upvoting Flag for upvoting or downvoting
   */
  handleRanking(giphy, upvoting = true) {
    const FRESH_SLATE = !giphy.upvoted && !giphy.downvoted;

    const UPVOTED_BEFORE_AND_UPVOTING = giphy.upvoted && upvoting;
    const UPVOTED_BEFORE_AND_DOWNVOTING = giphy.upvoted && !upvoting;

    const DOWNVOTED_BEFORE_AND_DOWNVOTING = giphy.downvoted && !upvoting;
    const DOWNVOTED_BEFORE_AND_UPVOTING = giphy.downvoted && upvoting;

    let downvoted, upvoted;
    let score = giphy._score;

    switch (true) {
      case UPVOTED_BEFORE_AND_UPVOTING || UPVOTED_BEFORE_AND_DOWNVOTING: {
        score -= 1;
        upvoted = !giphy.upvoted;
        downvoted = UPVOTED_BEFORE_AND_DOWNVOTING;
        break;
      }
      case DOWNVOTED_BEFORE_AND_DOWNVOTING || DOWNVOTED_BEFORE_AND_UPVOTING: {
        score += 1;
        downvoted = !giphy.downvoted;
        upvoted = DOWNVOTED_BEFORE_AND_UPVOTING;
        break;
      }
      case FRESH_SLATE && upvoting: {
        score += 1;
        upvoted = true;
        downvoted = !!downvoted;
        break;
      }
      case FRESH_SLATE && !upvoting: {
        score -= 1;
        downvoted = true;
        upvoted = !!upvoted;
        break;
      }
    }

    const update = {
      ...giphy,
      _score: score,
      upvoted,
      downvoted,
    };

    this.props.actions.updateGiphy(update);

    // save to local storage
    saveToLocalStorage(update.id, update);
  }

  /**
   * Renders Modal with giphy details
   * @return {JSX}
   */
  renderGiphyDetailsModal() {
    const { modals, actions } = this.props;
    const { focusedGiphy } = this.state;

    return (
      <Modal
        id={this.modalId}
        actions={actions}
        modals={modals}
      >
        {focusedGiphy && (
          <div className={'row'}>
            <div className={'col-sm-6 col-md-5'}>
              <img
                className={'card-img h-75'}
                src={focusedGiphy.images.downsized_medium.url}
              />

              <RankControls
                score={formatNumber(focusedGiphy._score)}
                onUpvote={() => this.handleRanking(focusedGiphy)}
                onDownvote={() => this.handleRanking(focusedGiphy, false)}
                className={'mt-3'}
              />
            </div>

            <div className={'col-sm-6 col-md-7'}>
              <ul className={'list-group'}>
                {focusedGiphy.title && (
                  <li className={'list-group-item d-flex'}>
                    <strong className={'mr-1'}>
                      {'Title:'}
                    </strong>
                    <span
                      title={focusedGiphy.title}
                      className={'text-capitalize text-truncate'}
                    >
                      {focusedGiphy.title}
                    </span>
                  </li>
                )}
                {focusedGiphy.username && (
                  <li className={'list-group-item d-flex'}>
                    <strong className={'mr-1'}>
                      {'Username:'}
                    </strong>
                    <span>
                      {focusedGiphy.username}
                    </span>
                  </li>
                )}
                <li className={'list-group-item d-flex'}>
                  <strong className={'mr-1'}>
                    {'Rating:'}
                  </strong>
                  <span className={'text-uppercase'}>
                    {focusedGiphy.rating}
                  </span>
                </li>
                <li className={'list-group-item d-flex'}>
                  <strong className={'mr-1'}>
                    {'Embed:'}
                  </strong>
                  <a
                    href={focusedGiphy.embed_url}
                    title={focusedGiphy.embed_url}
                    target={'_blank'}
                    className={'text-truncate'}
                  >
                    {focusedGiphy.embed_url}
                  </a>
                </li>
                {focusedGiphy.source && (
                  <li className={'list-group-item d-flex'}>
                    <strong className={'mr-1'}>
                      {'Source:'}
                    </strong>
                    <a
                      href={focusedGiphy.source}
                      title={focusedGiphy.source}
                      target={'_blank'}
                      className={'text-truncate'}
                    >
                      {focusedGiphy.source}
                    </a>
                  </li>
                )}
                <li className={'list-group-item d-flex'}>
                  <strong className={'mr-1'}>
                    {'Score:'}
                  </strong>
                  <span>
                    {formatNumber(focusedGiphy._score)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    );
  }

  /**
   * Renders search input and page limit controls
   * @return {JSX}
   */
  renderHeaderControls() {
    return (
      <div className={'form-row'}>
        <div className={'form-group col-lg-4 col-sm-6 col-md-5 mb-0 mr-auto'}>
          <div className={'input-group'}>
            <input
              id={'search-input'}
              type={'text'}
              ref={node => (this.searchNode = node)}
              placeholder={'Search...'}
              className={'form-control form-control-sm'}
            />

            <div className={'input-group-append'}>
              <button
                id={'search-btn'}
                type={'button'}
                onClick={() => this.handleSearch()}
                className={'btn btn-outline-secondary'}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>

        <div className={'form-group col-lg-2 col-sm-3 justify-content-end d-flex mb-0'}>
          <label className={'mr-3 d-none d-sm-block text-muted'}>
            {'Limit'}
          </label>
          <select
            id={'page-limit-select'}
            className={'form-control form-control-sm'}
            defaultValue={this.state.pageLimit}
            onChange={(e) => {
              const { value } = e.target;

              this.setState(() => ({
                pageLimit: value,
              }), () => this.handleSearch(0, true));
            }}
          >
            {this.pageLimitOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className={'form-group col-lg-1 col-sm-2 mb-0'}>
          <select
            id={'sort-select'}
            className={'form-control form-control-sm'}
            defaultValue={'Order By'}
            onChange={(e) => {
              const { value } = e.target;

              this.setState(() => ({
                sortDirection: value,
              }), () => this.props.actions.sortGiphies(value));
            }}
          >
            <option disabled>{'Order By'}</option>
            {this.sortingOptions.map((dir) => (
              <option key={dir}>{dir}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  /**
   * Renders giphy results
   * @return {JSX}
   */
  renderGiphyCards() {
    const { records, fetching, error, pagination } = this.props.giphies;
    const { pages, current } = pagination;

    return (
      <div className={'card-body'}>
        <div className={'position-relative'}>
          {fetching && <Loader />}

          <div className={'row'}>
            {records.map((giphy) => (
              <div
                key={giphy.id}
                className={'col-sm-6 col-md-4 col-lg-3 mt-3'}
              >
                <div
                  id={`giphy-${giphy.id}`}
                  className={'card'}
                >
                  <img
                    className={'object-fit-cover cursor-pointer rounded-top'}
                    src={giphy.images.fixed_height_downsampled.url}
                    alt={giphy.title}
                    onClick={() => {
                      this.props.actions.openModal(this.modalId);
                      this.setState(() => ({ focusedGiphy: giphy }));
                    }}
                  />

                  <div className={'card-body card-body--rank-wrapper'}>
                    <RankControls
                      score={formatNumber(giphy._score)}
                      onUpvote={() => this.handleRanking(giphy)}
                      onDownvote={() => this.handleRanking(giphy, false)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {(error || !records.length) && (
              <div
                id={error ? 'network-error' : 'no-giphies'}
                className={'col d-flex justify-content-center text-muted'}
              >
                <h5 className={'font-weight-light'}>
                  {error ? 'Network Error' : 'No Giphies to display'}
                </h5>
              </div>
            )}
          </div>

          {!!records.length && (
            <Pagination
              current={current}
              pages={pages}
              className={'mt-5'}
              onChange={(page) => {
                const offset = (page - 1) * this.state.pageLimit;

                this.handleSearch(offset, true);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className={'card card--emboss mt-5'}>
        <div className={'card-header'}>
          {this.renderHeaderControls()}
        </div>

        {this.renderGiphyCards()}
        {this.renderGiphyDetailsModal()}
      </section>
    );
  }
}

Giphies.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  modals: PropTypes.objectOf(PropTypes.object).isRequired,
  giphies: PropTypes.shape({
    records: PropTypes.array,
    error: PropTypes.bool,
    fetching: PropTypes.bool,
    pagination: PropTypes.object,
  }).isRequired,
};

export default connect(state => ({
  modals: state.get('modals').toJS(),
  giphies: state.get('giphies').toJS(),
}), dispatch => ({
  actions: bindActionCreators({
    ...giphyActions,
    ...modalActions,
  }, dispatch),
}))(Giphies);
