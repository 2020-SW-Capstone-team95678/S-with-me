import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';
import logo from '../../common-ui/logo.png';
import Button from '../../common-ui/Button';

import { NavLink } from 'react-router-dom';
export const HEIGHT = 80;

class AppNav extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { isLogin: true };
  }

  handleLogout() {
    window.sessionStorage.clear();
    this.setState({ isLogin: false });
  }
  render() {
    const { styles } = this.props;
    const activeStyle = {
      fontWeight: 'bold',
      color: '#9C2D17',
      fontSize: '2rem',
    };
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
            <div style={{ flex: 1, padding: 30 }}>서점</div>
            <div style={{ flex: 1, padding: 30 }}>프로필</div>
            <NavLink to="/">
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                <Button small onPress={() => this.handleLogout()}>
                  Logout
                </Button>
              </div>
            </NavLink>
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
