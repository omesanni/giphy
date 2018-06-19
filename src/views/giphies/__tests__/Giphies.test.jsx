import React from 'react';
import { shallow } from 'enzyme';
import { Giphies } from '../Giphies';
import { expectToMatchSnapshot } from '../../../utils/tests';
import { fetchFromLocalStorage } from '../../../utils/lib';

describe('Giphies', () => {
  let component;

  const records = [
    {
      id: 'aaa',
      _score: 20,
      title: 'cash me outside how bout dah',
      username: 'dirtydozen',
      rating: 'G',
      source: 'http://youtube',
      embed_url: 'http://embed',
      images: {
        downsized_medium: { url: 'http//www' },
        fixed_height_downsampled: { url: 'http//www' },
      },
    },
    {
      id: 'bbb',
      _score: 30,
      title: 'put some respeck on my name',
      username: 'southside',
      rating: 'PG',
      source: 'http://youtube',
      embed_url: 'http://embed',
      images: {
        downsized_medium: { url: 'http//www' },
        fixed_height_downsampled: { url: 'http//www' },
      },
    },
    {
      id: 'ccc',
      _score: 10,
      rating: 'PG',
      embed_url: 'http://embed',
      images: {
        downsized_medium: { url: 'http//www' },
        fixed_height_downsampled: { url: 'http//www' },
      },
    },
  ];

  const giphies = {
    error: false,
    fetching: false,
    pagination: { current: 1, pages: records.length },
    records,
  };

  const props = {
    modals: {
      'giphy-details': { isOpen: true },
    },
    actions: {
      openModal: jest.fn(),
      sortGiphies: jest.fn(),
      createModalStore: jest.fn(),
      deleteModalStore: jest.fn(),
      fetchGiphies: jest.fn(() => Promise.resolve({ data: {} })),
      updateGiphy: jest.fn((update) => {
        const newGiphies = {
          ...giphies,
          records: records.map((record) => {
            return record.id === update.id ? update : record;
          }),
        };

        component.setProps({ giphies: newGiphies });
      }),
    },
    giphies,
  };

  function getGiphies(p = props) {
    return <Giphies {...p} />;
  }

  function mountComponent(ownProps = props) {
    return shallow(getGiphies(props));
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    expectToMatchSnapshot(getGiphies());
  });

  it('should sort giphies', () => {
    component = mountComponent();

    component.find('#sort-select').simulate('change', {
      target: { value: 'desc' },
    });

    expect(props.actions.sortGiphies).toHaveBeenCalledWith('desc');
  });

  it('should show loader animation while fetching giphies', () => {
    component = mountComponent();

    component.setProps({ giphies: { ...props.giphies, fetching: true } });

    expect(component.find('Loader').length).toBe(1);
  });

  it('should show network error message', () => {
    component = mountComponent();

    component.setProps({ giphies: { ...props.giphies, error: true } });

    expect(component.find('#network-error').length).toBe(1);
  });

  it('should show no giphies message when no records were returned', () => {
    component = mountComponent();

    component.setProps({ giphies: { ...props.giphies, records: [] } });

    expect(component.find('#no-giphies').length).toBe(1);
  });

  it('should upvote giphy', () => {
    component = mountComponent();
    const instance = component.instance();

    jest.spyOn(instance, 'handleRanking');
    component.find(`#giphy-${records[0].id}`).find('RankControls').props().onUpvote();

    expect(instance.handleRanking).toHaveBeenCalledWith(records[0]);
  });

  it('should downvote giphy', () => {
    component = mountComponent();
    const instance = component.instance();

    jest.spyOn(instance, 'handleRanking');
    component.find(`#giphy-${records[0].id}`).find('RankControls').props().onDownvote();

    expect(instance.handleRanking).toHaveBeenCalledWith(records[0], false);
  });

  describe('openModal', () => {
    it('should open modal and show extra details when giphy is clicked', () => {
      component = mountComponent();
      const instance = component.instance();

      component.find(`#giphy-${records[2].id}`).find('img').simulate('click');

      expect(instance.state.focusedGiphy).toEqual(records[2]);
      expect(props.actions.openModal).toHaveBeenCalledWith(instance.modalId);
    });

    it('should update `focusedGiphy` state when giphy is upvoted or downvoted', () => {
      component = mountComponent();
      component.find(`#giphy-${records[1].id}`).find('img').simulate('click');

      const oldState = component.instance().state.focusedGiphy;
      component.find('Modal').find('RankControls').props().onUpvote();

      const newState = component.instance().state.focusedGiphy;

      expect(oldState).not.toEqual(newState);
    });
  });

  describe('handleRanking()', () => {
    it('should increment score and set `upvoted` to true', () => {
      component = mountComponent();
      const giphy = { id: 'aba', _score: 5 };

      component.instance().handleRanking(giphy);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score + 1);
      expect(update.upvoted).toBe(true);
    });

    it('should decrement score if someone who upvoted before is upvoting again', () => {
      component = mountComponent();
      const giphy = { id: 'bcc', _score: 8, upvoted: true };

      component.instance().handleRanking(giphy);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score - 1);
      expect(update.upvoted).toBe(false);
    });

    it('should decrement score and set `downvoted` to true', () => {
      component = mountComponent();
      const giphy = { id: 'ddc', _score: 10 };

      component.instance().handleRanking(giphy, false);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score - 1);
      expect(update.downvoted).toBe(true);
    });

    it('should increment score if someone who downvoted before is downvoting again', () => {
      component = mountComponent();
      const giphy = { id: 'xcc', _score: 20, downvoted: true };

      component.instance().handleRanking(giphy, false);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score + 1);
      expect(update.downvoted).toBe(false);
    });

    it('should decrement score if someone who upvoted before is now downvoting', () => {
      component = mountComponent();
      const giphy = { id: 'ddd', _score: 11, upvoted: true };

      component.instance().handleRanking(giphy, false);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score - 1);
      expect(update.upvoted).toBe(false);
      expect(update.downvoted).toBe(true);
    });

    it('should increment score if someone who downvoted before is now upvoting', () => {
      component = mountComponent();
      const giphy = { id: 'bbx', _score: 3, downvoted: true };

      component.instance().handleRanking(giphy);
      const update = fetchFromLocalStorage(giphy.id);

      expect(update._score).toEqual(giphy._score + 1);
      expect(update.upvoted).toBe(true);
      expect(update.downvoted).toBe(false);
    });
  });

  describe('handleSearch()', () => {
    it('should fetch giphies from API when search button is clicked', () => {
      component = mountComponent();

      component.instance().searchNode = { value: 'drake' };
      component.find('#search-btn').simulate('click');

      expect(props.actions.fetchGiphies).toHaveBeenCalled();
    });

    it('should fetch giphies from API when page limit is changed', () => {
      component = mountComponent();
      const instance = component.instance();

      instance.searchNode = {}
      instance.setState(() => ({ searchVal: 'demar defrozen' }));

      component.find('#page-limit-select').simulate('change', {
        target: { value: 50 },
      });

      expect(props.actions.fetchGiphies).toHaveBeenCalled();
    });

    it('should fetch and sort giphies returned from API', () => {
      component = mountComponent();
      const instance = component.instance();

      instance.searchNode = {};
      instance.setState(() => ({
        searchVal: 'lebronto',
        sortDirection: 'desc',
      }));

      component.find('Pagination').props().onChange(instance.pageLimitOptions[0]);
      expect(props.actions.fetchGiphies).toHaveBeenCalled();

      props.actions.fetchGiphies()
        .then(() => {
          expect(props.actions.sortGiphies).toHaveBeenCalledWith('desc');
        });
    });

    it('should not perform search if there\'s no search value', () => {
      component = mountComponent();
      component.instance().searchNode = {};

      component.find('#search-btn').simulate('click');

      expect(props.actions.fetchGiphies).not.toHaveBeenCalled();
    });
  });
});
