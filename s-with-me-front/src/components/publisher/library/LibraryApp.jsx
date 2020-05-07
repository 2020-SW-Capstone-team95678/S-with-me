import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import AppNav, { HEIGHT } from '../AppNav';
import LibraryFolderList from './LibraryFolderList';

class LibraryApp extends PureComponent {
  render() {
    const { children, styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList />
            </div>
            <div style={{ flex: 4, padding: 3 }}>Books...+</div>
          </div>
        </div>
      </div>
    );
  }
}

LibraryApp.propTypes = {
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
}))(LibraryApp);
