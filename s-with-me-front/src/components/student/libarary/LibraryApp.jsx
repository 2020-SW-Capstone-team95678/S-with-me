import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Card from '../../../common-ui/Card';
import LibraryFilterList from './LibraryFilterList';
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
    const { myBookList, bookListLoading, folderLoading, folderList, styles } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ flex: 1, border: '1px solid', borderColor: '#D9CBC7', borderRadius: '0.5rem' }}
          >
            <LibraryFilterList folders={folderList} isLoading={folderLoading} />
          </div>
          <div
            style={{ flex: 3, border: '1px solid', borderColor: '#D9CBC7', borderRadius: '0.5rem' }}
          >
            <Card vertical={4}>
              <div {...css(styles.head)}>나의 문제집</div>
            </Card>
            <BookOverview myBookList={myBookList} isLoading={bookListLoading} />
          </div>
          <div
            style={{ flex: 1, border: '1px solid', borderColor: '#D9CBC7', borderRadius: '0.5rem' }}
          >
            <Card vertical={4}>
              <div {...css(styles.head)}>이달의 목표</div>
            </Card>
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default withStyles(() => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 11,
    paddingTop: 11,
    fontWeight: 'bold',
  },
}))(LibraryApp);
