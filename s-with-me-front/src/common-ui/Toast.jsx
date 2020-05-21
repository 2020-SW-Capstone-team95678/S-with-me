import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import Spacing from './Spacing';

class Toast extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    warning: PropTypes.bool,
    message: PropTypes.string,
  };

  render() {
    const { message, styles, warning } = this.props;
    return (
      <div {...css(styles.overlay)}>
        <div {...css(styles.wrapper, warning && styles.warning)}>
          <Spacing vertical={4} horizontal={8}>
            {message}
          </Spacing>
        </div>
      </div>
    );
  }
}

export default withStyles(({ depth, unit, color }) => ({
  overlay: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: unit * 4,
  },
  wrapper: {
    ...depth.level1,
    borderRadius: unit,
    backgroundColor: color.secondary,
    padding: unit * 2,
    marginBottom: unit * 4,
  },
  warning: {
    backgroundColor: color.error,
  },
}))(Toast);
