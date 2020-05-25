import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';

import logo from '../../common-ui/logo.png';
import Button from '../../common-ui/Button';

import { NavLink, Link } from 'react-router-dom';
export const HEIGHT = 80;

class AppNav extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.sessionStorage.clear();
  }

  render() {
    const { styles } = this.props;
    const activeStyle = {
      fontWeight: 'bold',
      fontSize: '2rem',
    };
    return (
      <div>
        <div {...css(styles.wrapper)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1 }}>
              <NavLink to="/">
                <img
                  src={logo}
                  alt="s-with-me logo"
                  style={{
                    height: 80,
                    top: this.props.top,
                    left: this.props.left,
                  }}
                />
              </NavLink>
            </div>
            <div style={{ flex: 1 }}>
              <NavLink to="/library" activeStyle={activeStyle}>
                서재
              </NavLink>
            </div>
            <div style={{ flex: 1 }}>
              <NavLink to="/note" activeStyle={activeStyle}>
                오답노트
              </NavLink>
            </div>
            <div style={{ flex: 1 }}>서점</div>
            <div style={{ flex: 1 }}>프로필</div>
            <div style={{ flex: 1 }}>
              <Link to="/">
                <Button small onPress={() => this.handleLogout()}>
                  로그아웃
                </Button>
              </Link>
            </div>
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
