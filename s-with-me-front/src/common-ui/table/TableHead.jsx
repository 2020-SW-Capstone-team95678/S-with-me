import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return (
      <thead>
        {React.Children.map(children, child => React.cloneElement(child, { isHeader: true }))}
      </thead>
    );
  }
}
