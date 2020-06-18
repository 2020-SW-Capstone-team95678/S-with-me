import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import { Button, Modal } from 'semantic-ui-react';

export default class DeleteFolderPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const studentId = window.sessionStorage.getItem('studentId');
    const { deleteFolder, requestFolderList, requestMyBookList, folderId } = this.props;
    deleteFolder(folderId * 1, () => {
      requestFolderList({ studentId: studentId });
      this.props.close(false);
      requestMyBookList({ studentId: studentId });
    });
  }

  render() {
    const { open } = this.props;
    return (
      <Modal size="tiny" dimmer="inverted" open={open} onClose={() => this.props.close(false)}>
        <Modal.Content>
          <Text large>정말로 삭제하시겠습니까?</Text> <br />
          <Text>폴더 내의 문제집은 분류되지 않음 폴더로 이동됩니다.</Text>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.close(false)} content="취소" />
          <Button
            onClick={() => this.handleSubmit()}
            type="submit"
            negative
            icon="delete"
            labelPosition="right"
            content="삭제"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
