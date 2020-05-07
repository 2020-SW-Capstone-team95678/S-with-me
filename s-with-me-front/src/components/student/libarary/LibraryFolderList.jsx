import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import LibraryFolderFilter from './LibraryFolderFilter';
import LibraryFolderTable from './LibraryFolderTable';

import Api from '../../../Api';

export default class LibraryFolderList extends PureComponent {
  state = {
    // dummy data
    folders: [
      Api.get('/folders', { params: { id: 1 } }).then(response =>
        this.setState({
          folders: response.data,
        }),
      ),
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
