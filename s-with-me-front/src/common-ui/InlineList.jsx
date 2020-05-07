import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import { unit } from './Theme';

class InlineList extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    spacingBetween: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    spacingBetween: 1,
  };

  render() {
    const { align, children, styles, spacingBetween, verticalAlign } = this.props;
    return (
      <div
        {...css(
          styles.wrapper,
          (align === 'center') & styles.alignCenter,
          (align === 'right') & styles.alignRight,
          (verticalAlign === 'top') & styles.verticalAlignTop,
          (verticalAlign === 'bottom') & styles.verticalAlignBottom,
        )}
      >
        {React.Children.map(children, child => (
          <div {...css({ marginRight: spacingBetween * unit })}>{child}</div>
        ))}
      </div>
    );
  }
}

export default withStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContext: 'flex-end',
  },
  verticalAlignTop: {
    alignItems: 'flex-start',
  },
  verticalAlignBottom: {
    alignItems: 'flex-end',
  },
}))(InlineList);
