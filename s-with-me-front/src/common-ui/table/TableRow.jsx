import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TableRow extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    baseline: PropTypes.bool,
    isHeader: PropTypes.bool,
  };

  render() {
    const { children, isHeader, baseline } = this.props;
    return (
      <tr>
        {React.Children.map(children, child => React.cloneElement(child, { baseline, isHeader }))}
      </tr>
    );
  }
}
