import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Heading from '../../../common-ui/Heading';

import AppNav, { HEIGHT } from '../AppNav';
import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

class LibraryApp extends PureComponent {
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <Heading level={4}>My Book</Heading>
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 4, padding: 3 }}>
              <BookOverview />
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList />
            </div>
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
