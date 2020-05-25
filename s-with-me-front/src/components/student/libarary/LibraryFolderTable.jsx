import React, { PureComponent } from 'react';

import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';
import Button from '../../../common-ui/Button';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_FOLDER } from '../../../constants/modals';

export default class LibraryFolderTable extends PureComponent {
  render() {
    const { folders } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    return (
      <Table>
        <TableBody>
          {folders.map(({ folderId, folderName }) => (
            <TableRow key={folderId}>
              <TableCell>
                <Button>{folderName}</Button>
                <Modal>
                  {({ openModal }) => (
                    <Button
                      xsmall
                      onPress={() =>
                        openModal(DELETE_FOLDER, { studentId: studentId, folderId: folderId })
                      }
                    >
                      삭제
                    </Button>
                  )}
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
