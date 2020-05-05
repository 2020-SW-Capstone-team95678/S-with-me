import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../common-ui/withStyles';
import logo from '../common-ui/logo.png';
export const HEIGHT = 64;

class AppNav extends PureComponent {
  render() {
    const { styles } = this.props;
    return (
      <div>
        <div {...css(styles.wrapper)}>
          <div {...css(styles.container)}>
            <img
              src={logo}
              alt="s-with-me logo"
              style={{
                height: 70,
                top: this.props.top,
                left: this.props.left,
              }}
            />
            서재, 오답노트, 서점, 프로필
          </div>
        </div>
      </div>
    );
  }
}

AppNav.propTypes = {
  ...withStylesPropTypes,
};

export default withStyles(({ color, depth, unit }) => ({
  wrapper: {
    ...depth.level1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: HEIGHT - 4,
    backgroundColor: color.secondary,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },
}))(AppNav);
