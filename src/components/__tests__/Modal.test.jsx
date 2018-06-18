import React from 'react';
import { shallow } from 'enzyme';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import Modal from '../Modal';
import { expectToMatchSnapshot } from '../../utils/tests';

describe('Modal', () => {
  let component;

  const props = {
    id: 'giphy-details',
    modals: {
      'giphy-details': { isOpen: true },
    },
    actions: {
      closeModal: jest.fn(),
      createModalStore: jest.fn(),
      deleteModalStore: jest.fn(),
    },
  };

  function getModal(p = props) {
    return (
      <Modal {...p}>
        <section />
      </Modal>
    );
  }

  function mountComponent(ownProps = props) {
    return shallow(getModal(ownProps));
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing', () => {
    const newProps = { ...props, modals: {} };

    expectToMatchSnapshot(getModal(newProps));
  });

  it('renders JSX', () => {
    expectToMatchSnapshot(getModal());
  });

  it('renders modal with title header', () => {
    component = mountComponent({ ...props, title: 'Details' });

    expect(component.find('.modal__title').length).toBe(1);
  });

  it('creates modal store on `componentWillMount`', () => {
    component = mountComponent();

    expect(props.actions.createModalStore).toHaveBeenCalledWith(props.id);
  });

  it('deletes modal store on `componentWillUnmount`', () => {
    component = mountComponent();
    component.unmount();

    expect(props.actions.deleteModalStore).toHaveBeenCalledWith(props.id);
  });

  describe('close()', () => {
    it('should close modal when close icon is clicked', () => {
      component = mountComponent();
      const closeIcon = component.find('FontAwesomeIcon')
        .findWhere(c => c.prop('icon') === faTimes);

      closeIcon.simulate('click');

      expect(props.actions.closeModal).toHaveBeenCalledWith(props.id);
    });

    it('should close modal when modal backdrop is clicked', () => {
      component = mountComponent();

      component.find('.modal__backdrop').simulate('click');

      expect(props.actions.closeModal).toHaveBeenCalledWith(props.id);
    });
  });
});
