import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';

import logo from '../../common-ui/logo.png';
import Button from '../../common-ui/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { NavLink, Redirect } from 'react-router-dom';
export const HEIGHT = 80;

class AppNav extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.sessionStorage.clear();
    this.props.setLogged(false);
  }

  render() {
    const { styles } = this.props;
    const activeStyle = {
      fontWeight: 'bold',
      color: '#9C2D17',
      fontSize: '1.5rem',
    };
    if (this.props.logged) {
      return (
        <div>
          <div {...css(styles.wrapper)}>
            <div style={{ display: 'flex' }} {...css(styles.container)}>
              <div style={{ flex: 1 }}>
                <NavLink to="/library">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={logo} alt="s-with-me logo" style={{ height: 80 }} />
                  </div>
                </NavLink>
              </div>
              <div style={{ flex: 1 }}>
                <NavLink
                  to="/library"
                  activeStyle={activeStyle}
                  style={{ textDecoration: 'none', color: '#333333' }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
                  >
                    <FontAwesomeIcon icon={faBookReader} size="lg" />
                    서재
                  </div>
                </NavLink>
              </div>
              <div style={{ flex: 1 }}>
                <NavLink
                  to="/note"
                  activeStyle={activeStyle}
                  style={{ textDecoration: 'none', color: '#333333' }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
                  >
                    <FontAwesomeIcon icon={faStickyNote} size="lg" />
                    오답노트
                  </div>
                </NavLink>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <FontAwesomeIcon icon={faStore} size="lg" />
                  서점
                </div>
              </div>
              <div style={{ flex: 1, color: '#333333' }}>
                <NavLink
                  to="/profile"
                  activeStyle={activeStyle}
                  style={{ textDecoration: 'none', color: '#333333' }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
                  >
                    <FontAwesomeIcon icon={faUserCircle} size="lg" />
                    프로필
                  </div>
                </NavLink>
              </div>
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
    } else {
      return <Redirect to="/" />;
    }
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
