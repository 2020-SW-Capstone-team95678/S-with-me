import React, { PureComponent } from 'react';

import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';
import Button from '../../../common-ui/Button';

export default class LibraryFolderTable extends PureComponent {
  render() {
    const { folders } = this.props;
    return (
      <Table>
        <TableBody>
          {folders.map(({ folderId, folderName }) => (
            <TableRow key={folderId}>
              <TableCell>
                <Button>{folderName}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
