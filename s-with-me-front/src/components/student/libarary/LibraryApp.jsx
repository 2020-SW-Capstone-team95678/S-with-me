import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

class LibraryApp extends PureComponent {
  static defaultProps = {
    myBookList: [],
    folderList: [],
    requestMyBookList: () => {},
    requestFolderList: () => {},
  };

  componentDidMount() {

    const { requestMyBookList, requestFolderList } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    requestMyBookList({ studentId: studentId });
    requestFolderList({ studentId: studentId });
  }

  render() {
    const { styles, myBookList, bookListLoading, folderLoading, folderList } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 3 }}>
              <LibraryFolderList folders={folderList} isLoading={folderLoading} />
            </div>
            <div style={{ flex: 3, padding: 3 }}>
              <BookOverview myBookList={myBookList} isLoading={bookListLoading} />
            </div>
            <div style={{ flex: 1, padding: 3 }}>이 달의 목표 ..</div>
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
