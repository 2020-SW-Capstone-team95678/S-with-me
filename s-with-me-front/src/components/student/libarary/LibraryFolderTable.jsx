import React, { PureComponent } from 'react';

import { List, Button, Modal, Input } from 'semantic-ui-react';
import FolderButtonContainer from '../../../containers/student/book/FolderButtonContainer';
import DeleteFolderPageContainer from '../../../containers/student/book/DeleteFolderPageContainer';

export default class LibraryFolderTable extends PureComponent {
  state = { openEdit: false, openDelete: false, folderName: '' };
  show = isEdit => {
    if (isEdit) this.setState({ openEdit: true });
    else this.setState({ openDelete: true });
  };
  close = isEdit => {
    if (isEdit) this.setState({ openEdit: false });
    else this.setState({ openDelete: false });
  };
  handleInputChange = (e, { value }) => {
    this.setState({ folderName: value });
  };
  handleSubmit(folderId) {
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestFolderList, updateFolderName } = this.props;
    const formValue = {
      folderName: this.state.folderName,
    };
    updateFolderName(folderId, formValue, () => {
      this.close(true);
      requestFolderList({ studentId: studentId });
    });
  }
  render() {
    const { folders, moveMyBook } = this.props;
    const { openEdit, openDelete } = this.state;
    return (
      <List divided verticalAlign="middle">
        {folders.map(({ folderId, folderName }) => (
          <List.Item key={folderId}>
            <List.Content>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingBottom: 5,
                  paddingTop: 5,
                }}
              >
                <List.Icon name="folder" size="large" verticalAlign="middle" />
                <FolderButtonContainer
                  folderId={folderId}
                  folderName={folderName}
                  moveMyBook={moveMyBook}
                />
              </div>
            </List.Content>
            {folderName === '분류되지 않음' ? null : (
              <List.Content>
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 5 }}>
                  <Button
                    size="mini"
                    basic
                    color="black"
                    content="수정"
                    onClick={() => this.show(true)}
                  />
                  <Modal
                    size="tiny"
                    dimmer="inverted"
                    open={openEdit}
                    onClose={() => this.close(true)}
                  >
                    <Modal.Content>
                      <p>폴더 이름을 수정해 주세요.</p>
                      <Input fluid onChange={this.handleInputChange} placeholder="enter..." />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button negative onClick={() => this.close(true)} content="취소" />
                      <Button
                        onClick={() => this.handleSubmit(folderId)}
                        type="submit"
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        content="폴더 이름 수정"
                      />
                    </Modal.Actions>
                  </Modal>
                  <Button
                    negative
                    basic
                    size="mini"
                    content="삭제"
                    onClick={() => this.show(false)}
                  />
                  <DeleteFolderPageContainer
                    open={openDelete}
                    close={this.close}
                    folderId={folderId}
                  />
                </div>
              </List.Content>
            )}
          </List.Item>
        ))}
      </List>
    );
  }
}
