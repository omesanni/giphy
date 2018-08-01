import React from 'react';
import PropTypes from 'prop-types';

class AsyncComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      Component: null,
    };
  }

  componentDidMount() {
    this.props.render()
      .then(Component => this.setState(() => ({ Component })))
      .catch(console.error); // eslint-disable-line
  }

  render() {
    const { Component } = this.state;

    if (Component) {
      return React.createElement(Component.default, this.props);
    }

    return null;
  }
}

AsyncComponent.propTypes = {
  render: PropTypes.func.isRequired,
};

export default AsyncComponent;
