import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class Modal extends React.Component {
  constructor() {
    super();

    this.close = this.close.bind(this);
  }

  componentWillMount() {
    this.props.actions.createModalStore(this.props.id);
  }

  componentWillUnmount() {
    this.props.actions.deleteModalStore(this.props.id);
  }

  /**
   * Close the modal.
   * @return {Object} action
   */
  close() {
    return this.props.actions.closeModal(this.props.id);
  }

  render() {
    const modal = this.props.modals[this.props.id];

    if (!modal) {
      return null;
    }

    return (
      <div
        className={classnames('modal', {
          'is-open': modal.isOpen,
        })}
      >
        <div className={'modal__container'}>
          <div className={'modal__close'}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={this.close}
            />
          </div>

          <div
            className={classnames('modal__content', this.props.className)}
          >
            {this.props.title && (
              <h3 className={'modal__title'}>{this.props.title}</h3>
            )}
            {this.props.children}
          </div>
        </div>
        <div className={'modal__backdrop'} onClick={this.close} />
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  modals: PropTypes.objectOf(PropTypes.object).isRequired,
};

Modal.defaultProps = {
  children: null,
  className: '',
  title: undefined,
};

export default Modal;
