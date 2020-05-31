import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import LibraryFolderFilter from './LibraryFolderFilter';
import LibraryFolderTableContainer from '../../../containers/student/book/LibraryFolderTableContainer';

export default class LibraryFolderList extends PureComponent {
  render() {
    const { folders } = this.props;
    return (
      <div>
        <Card vertical={4}>
          <LibraryFolderFilter />
        </Card>
        <Card>
          <LibraryFolderTableContainer folders={folders} />
        </Card>
      </div>
    );
  }
}
