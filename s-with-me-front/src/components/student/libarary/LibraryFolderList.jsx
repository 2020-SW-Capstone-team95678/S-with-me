import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import LibraryFolderFilter from './LibraryFolderFilter';
import LibraryFolderTable from './LibraryFolderTable';

export default class LibraryFolderList extends PureComponent {
  state = {
    // dummy data
    folders: [
      { id: 1, name: '2017' },
      { id: 2, name: '2018' },
    ],
  };
  render() {
    const { folders } = this.state;
    return (
      <div>
        <Card vertical={4}>
          <LibraryFolderFilter />
        </Card>
        <Card>
          <LibraryFolderTable folders={folders} />
        </Card>
      </div>
    );
  }
}
