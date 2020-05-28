import React, { PureComponent } from 'react';

import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

export default class LibraryApp extends PureComponent {
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
    const { myBookList, bookListLoading, folderLoading, folderList } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <LibraryFolderList folders={folderList} isLoading={folderLoading} />
        </div>
        <div style={{ flex: 3, padding: 3 }}>
          <BookOverview myBookList={myBookList} isLoading={bookListLoading} />
        </div>
        <div style={{ flex: 1, padding: 3 }}>이 달의 목표 ..</div>
      </div>
    );
  }
}
