import React, { PureComponent } from 'react';
import AppLayout from '../AppLayout';
import BookOverview from './BookOverview';
import LibraryFolderList from './LibraryFolderList';

import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

class LibraryApp extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };

  render() {
    const { styles } = this.props;
    return (
      <div>
        <div {...css(styles.wrapper)}>
          <AppLayout>
            <div style={{ display: 'flex' }} {...css(styles.container)}>
              <div style={{ flex: 1, padding: 3 }}>
                <LibraryFolderList />
              </div>
              <div style={{ flex: 3, padding: 3 }}>
                <BookOverview />
              </div>
              <div style={{ flex: 1, padding: 3 }}>이 달의 목표</div>
            </div>
          </AppLayout>
        </div>
      </div>
    );
  }
}

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
    backgroundColor: color.white,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },
}))(LibraryApp);
