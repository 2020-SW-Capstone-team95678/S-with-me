import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles, { css } from './withStyles';

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    xsmall: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    xlarge: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onPress: PropTypes.func,
  };
  static defaultProps = {
    onPress: () => {},
    xsmall: false,
    small: false,
    large: false,
    xlarge: false,
    secondary: false,
    primary: false,
  };

  render() {
    const {
      children,
      disabled,
      styles,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
      onPress,
    } = this.props;

    return (
      <button
        {...css(
          styles.default,
          xsmall && styles.xsmall,
          small && styles.small,
          large && styles.large,
          xlarge && styles.xlarge,
          primary && styles.primary,
          secondary && styles.secondary,
        )}
        onClick={onPress}
      >
        {children}
      </button>
    );
  }
}

export default withStyles(({ color, size, unit, responsive }) => ({
  default: {
    border: 1,
    borderStyle: 'solid',
    borderColor: color.default,
    borderRadius: 2,
    color: color.default,
    fontSize: size.md,
    padding: unit * 2,
    cursor: 'pointer',
    [responsive.small]: {
      width: '100%',
    },
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  small: {
    fontSize: size.sm,
    padding: unit,
  },
  xsmall: {
    fontSize: size.xs,
    padding: unit,
  },
  primary: {
    borderColor: color.primary,
    color: color.white,
    backgroundColor: color.primary,
  },
  secondary: {
    borderColor: color.secondary,
    color: color.secondary,
  },
}))(Button);
