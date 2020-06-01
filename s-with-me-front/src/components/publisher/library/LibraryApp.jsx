import React, { PureComponent } from 'react';

import LibraryFolderList from './LibraryFolderList';
import BookOverview from './BookOverview';

export default class LibraryApp extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 4, padding: 3 }}>
          <BookOverview />
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <LibraryFolderList />
        </div>
      </div>
    );
  }
}
