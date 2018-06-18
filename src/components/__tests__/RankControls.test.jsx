import React from 'react';
import { shallow } from 'enzyme';
import RankControls from '../RankControls';
import { expectToMatchSnapshot } from '../../utils/tests';

describe('RankControls', () => {
  let component;

  const props = {
    score: 20,
    onUpvote: jest.fn(),
    onDownvote: jest.fn(),
  };

  function getRankControls() {
    return <RankControls {...props} />;
  }

  function mountComponent() {
    return shallow(getRankControls());
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    expectToMatchSnapshot(getRankControls());
  });

  it('should upvote', () => {
    component = mountComponent();
    component.find('.rank-controls__up').simulate('click');

    expect(props.onUpvote).toHaveBeenCalled();
  });

  it('should downvote', () => {
    component = mountComponent();
    component.find('.rank-controls__down').simulate('click');

    expect(props.onDownvote).toHaveBeenCalled();
  });
});
