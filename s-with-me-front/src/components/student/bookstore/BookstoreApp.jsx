import React, { PureComponent } from 'react';

import BookstoreFilter from './BookstoreFilter';
import BookstoreTable from './BookstoreTable';

export default class BookstoreApp extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <BookstoreFilter />
        <BookstoreTable />
      </div>
    );
  }
}
