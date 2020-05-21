import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Toast from '../common-ui/Toast';

export default class Notification extends PureComponent {
  static propTypes = {
    showMessage: PropTypes.bool,
    warning: PropTypes.bool,
    message: PropTypes.string,
  };

  render() {
    const { showMessage, message, warning } = this.props;
    return showMessage && <Toast message={message} warning={warning} />;
  }
}
