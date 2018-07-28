import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import { expectToMatchSnapshot } from '../../utils/tests';

describe('Pagination', () => {
  let component;

  const props = {
    current: 10,
    pages: 25,
    onChange: jest.fn(),
  };

  function getPagination(p = props) {
    return <Pagination {...p} />;
  }

  function mountComponent(ownProps = props) {
    return shallow(getPagination(ownProps));
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with ellipsis after page 1 and before last page', () => {
    expectToMatchSnapshot(getPagination());
  });

  it('renders with ellipsis only before last page', () => {
    expectToMatchSnapshot(getPagination({ ...props, current: 1 }));
  });

  it('renders with ellipsis only after page 1', () => {
    expectToMatchSnapshot(getPagination({ ...props, current: 24 }));
  });

  describe('onChange()', () => {
    it('returns preceding page when previous button is clicked', () => {
      component = mountComponent();

      component.find('.page-item').first().simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(props.current - 1);
    });

    it('returns next page when next button is clicked', () => {
      component = mountComponent();

      component.find('.page-item').last().simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(props.current + 1);
    });

    it('should change page when a page within spread range is clicked', () => {
      component = mountComponent();
      const page = component.find('.page-item').findWhere(item => item.key()).at(0);

      page.simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(Number(page.key()));
    });

    it('should go to first page', () => {
      component = mountComponent();

      component.find('.page-item').at(1).simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(1);
    });

    it('should go to last page', () => {
      component = mountComponent();
      const pageItems = component.find('.page-item');

      pageItems.at(pageItems.length - 2).simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(props.pages);
    });
  });
});
