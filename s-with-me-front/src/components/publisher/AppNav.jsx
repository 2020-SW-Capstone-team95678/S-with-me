import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../common-ui/withStyles';

import logo from '../../common-ui/logo.png';
import { Button, Icon, Divider } from 'semantic-ui-react';

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
      color: '#FF4A25',
      fontSize: '1.5rem',
    };
    if (this.props.logged) {
      return (
        <div>
          <div {...css(styles.wrapper)}>
            <div style={{ display: 'flex' }} {...css(styles.container)}>
              <div style={{ flex: 1 }}>
                <NavLink to="/inventory">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={logo} alt="s-with-me logo" style={{ height: 80 }} />
                  </div>
                </NavLink>
              </div>
              <div style={{ flex: 1 }}>
                <NavLink
                  to="/inventory"
                  activeStyle={activeStyle}
                  style={{ textDecoration: 'none', color: '#333333' }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                  >
                    <Icon name="book" />
                    서재
                  </div>
                </NavLink>
              </div>
              <div style={{ flex: 1, color: '#333333' }}>
                <NavLink
                  to="/profile"
                  activeStyle={activeStyle}
                  style={{ textDecoration: 'none', color: '#333333' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="user circle" />
                    프로필
                  </div>
                </NavLink>
              </div>
              <NavLink to="/">
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                  <Button
                    circular
                    basic
                    color="black"
                    onClick={() => this.handleLogout()}
                    icon="sign-out"
                    content="Logout"
                  />
                </div>
              </NavLink>
            </div>
            <Divider fitted />
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

export default withStyles(({ unit, responsive }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: HEIGHT - 4,
    backgroundColor: '#f5f5f5',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },
}))(AppNav);
