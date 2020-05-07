import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TableBody extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    const { length } = React.Children.toArray(children);

    return (
      <tbody>
        {React.Children.map(children, (child, index) => {
          // 마지막 줄 생략 하기 위함
          const baseline = index < length - 1 ? true : false;
          return React.cloneElement(child, { baseline });
        })}
      </tbody>
    );
  }
}
