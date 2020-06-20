import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from './withStyles';
import { Message } from 'semantic-ui-react';

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
        <Message color={warning ? 'red' : 'green'} size="large">
          {message}
        </Message>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  overlay: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: unit * 4,
  },
}))(Toast);
