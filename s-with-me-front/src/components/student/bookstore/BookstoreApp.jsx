import React, { PureComponent } from 'react';

import BookstoreFilter from './BookstoreFilter';
import BookstoreTable from './BookstoreTable';

export default class BookstoreApp extends PureComponent {
  componentDidMount() {
    const { requestBookList, requestAdBookList } = this.props;
    const grade = window.sessionStorage.getItem('grade');
    requestBookList(grade);
    // requestAdBookList(grade);
  }
  render() {
    const { bookList } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <BookstoreFilter />
        <BookstoreTable bookList={bookList} />
      </div>
    );
  }
}
