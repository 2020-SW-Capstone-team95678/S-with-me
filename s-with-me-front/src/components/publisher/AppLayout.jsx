import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';
import AppNav, { HEIGHT } from './AppNav';

class AppLayout extends PureComponent {
  render() {
    const { children, styles, logged, setLogged } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <div {...css(styles.body)}>{children}</div>
        <AppNav logged={logged} setLogged={setLogged} />
      </div>
    );
  }
}

AppLayout.propTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node,
};

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(AppLayout);
