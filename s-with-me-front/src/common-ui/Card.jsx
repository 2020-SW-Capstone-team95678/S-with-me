import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import Spacing, { propTypes as spacingPropTypes } from './Spacing';

class Card extends PureComponent {
  static propTypes = {
    ...spacingPropTypes,
    ...withStylesPropTypes,
    children: PropTypes.node,
  };

  render() {
    const { children, styles, ...spacingProps } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <Spacing {...spacingProps}>{children}</Spacing>
      </div>
    );
  }
}

export default withStyles(({ depth, unit, color }) => ({
  wrapper: {
    ...depth.level,
    borderRadius: unit,
    backgroundColor: color.white,
    display: 'flex',
    overflow: 'hidden',
    marginBottom: unit * 4,
  },
}))(Card);
