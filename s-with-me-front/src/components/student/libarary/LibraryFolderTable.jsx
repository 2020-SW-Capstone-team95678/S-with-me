import React, { PureComponent } from 'react';

import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';
import Button from '../../../common-ui/Button';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_FOLDER, UPDATE_FOLDER_NAME } from '../../../constants/modals';

import FolderButtonContainer from '../../../containers/student/book/FolderButtonContainer';

export default class LibraryFolderTable extends PureComponent {
  render() {
    const { folders, moveMyBook } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    return (
      <Table>
        <TableBody>
          {folders.map(({ folderId, folderName }) => (
            <TableRow key={folderId}>
              <TableCell>
                <FolderButtonContainer
                  folderId={folderId}
                  folderName={folderName}
                  moveMyBook={moveMyBook}
                />
                <Modal>
                  {({ openModal }) => (
                    <div>
                      <Button
                        primary
                        xsmall
                        onPress={() =>
                          openModal(DELETE_FOLDER, { studentId: studentId, folderId: folderId })
                        }
                      >
                        삭제
                      </Button>
                      <Button
                        xsmall
                        onPress={() =>
                          openModal(UPDATE_FOLDER_NAME, {
                            studentId: studentId,
                            folderId: folderId,
                          })
                        }
                      >
                        수정
                      </Button>
                    </div>
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
