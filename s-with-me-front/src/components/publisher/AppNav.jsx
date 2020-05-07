import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';
import logo from '../../common-ui/logo.png';
export const HEIGHT = 80;

class AppNav extends PureComponent {
  render() {
    const { styles } = this.props;
    return (
      <div>
        <div {...css(styles.wrapper)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1, padding: 30 }}>
              <img
                src={logo}
                alt="s-with-me logo"
                style={{
                  height: 80,
                  top: this.props.top,
                  left: this.props.left,
                }}
              />
            </div>
            <div style={{ flex: 3, padding: 30 }}>검색</div>
            <div style={{ flex: 1, padding: 30 }}>프로필</div>
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
