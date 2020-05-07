import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';

import LibraryFolderFilter from './LibraryFolderFilter';

export default class LibraryFolderList extends PureComponent {
  render() {
    return (
      <div>
        <Card vertical={4}>
          <LibraryFolderFilter />
        </Card>
        <Card>{/* <LibraryFolderTable folders={folders} /> */}</Card>
      </div>
    );
  }
}
