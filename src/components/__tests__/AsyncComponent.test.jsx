import React from 'react';
import { shallow } from 'enzyme';
import AsyncComponent from '../AsyncComponent';

describe('AsyncComponent', () => {
  let component;

  function mountComponent(props) {
    return shallow(<AsyncComponent {...props} />);
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', (done) => {
    const promise = Promise.resolve({ default: AsyncComponent });
    const props = { render: jest.fn(() => promise) };

    component = mountComponent(props);
    const instance = component.instance();

    promise.then(() => {
      expect(props.render).toHaveBeenCalled();
      expect(instance.state.Component).toBeTruthy();
      done();
    });
  });

  it('renders nothing', (done) => {
    const promise = Promise.reject();
    const props = { render: jest.fn(() => promise) };

    component = mountComponent(props);
    const instance = component.instance();

    promise.then(() => undefined).catch(() => {
      expect(props.render).toHaveBeenCalled();
      expect(instance.state.Component).toBeFalsy();
      done();
    });
  });
});
