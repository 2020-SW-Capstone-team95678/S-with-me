import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Toast from '../common-ui/Toast';

export default class Notification extends PureComponent {
  static propTypes = {
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  render() {
    const { hasError, errorMessage } = this.props;
    return hasError && <Toast message={errorMessage} warning />;
  }
}
