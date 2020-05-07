import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import Heading from '../../../common-ui/Heading';

import LibraryFolderFilter from './LibraryFolderFilter';

export default class LibraryFolderList extends PureComponent {
  render() {
    return (
      <div>
        <Card vertical={4}>
          <Heading level={4}>My Book</Heading>
          <LibraryFolderFilter />
        </Card>
        <Card>{/* <LibraryFolderTable folders={folders} /> */}</Card>
      </div>
    );
  }
}
