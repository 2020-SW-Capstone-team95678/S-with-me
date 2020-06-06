import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Option extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const { disabled, value, label } = this.props;
    return (
      <option value={value} disabled={disabled}>
        {label || value}
      </option>
    );
  }
}
