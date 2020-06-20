import React, { PureComponent } from 'react';

import BookstoreTable from './BookstoreTable';
import BookstoreFilterContainer from '../../../containers/student/book/BookstoreFilterContainer';

export default class BookstoreApp extends PureComponent {
  componentDidMount() {
    const { requestBookList, requestAdBookList } = this.props;
    const grade = window.sessionStorage.getItem('grade');
    requestBookList(grade);
    requestAdBookList(grade);
  }
  render() {
    const { bookList, adBookList } = this.props;
    return (
      <div>
        <BookstoreFilterContainer />
        <BookstoreTable bookList={bookList} adBookList={adBookList} />
      </div>
    );
  }
}
