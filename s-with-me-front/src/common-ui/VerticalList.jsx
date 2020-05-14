import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import { unit } from './Theme';

class InlineList extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    horizontalAlign: PropTypes.oneOf(['left', 'center', 'right']),
    spacingBetween: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    spacingBetween: 1,
  };

  render() {
    const { align, children, styles, spacingBetween, horizontalAlign } = this.props;
    return (
      <div
        {...css(
          styles.wrapper,
          align === 'top' && styles.alignTop,
          align === 'bottm' && styles.alignBottom,
          horizontalAlign === 'center' && styles.horizontalAlignCenter,
          horizontalAlign === 'right' && styles.horizontalAlignRight,
        )}
      >
        {React.Children.map(children, child => (
          <div {...css({ marginBottom: spacingBetween * unit })}>{child}</div>
        ))}
      </div>
    );
  }
}

export default withStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'left',
  },
  horizontalAlignCenter: {
    alignItems: 'center',
  },
  horizontalAlignRight: {
    alignItems: 'flex-end',
  },
  alignTop: {
    justifyContent: 'flex-start',
  },
  alignBottom: {
    justifyContent: 'flex-end',
  },
}))(InlineList);
