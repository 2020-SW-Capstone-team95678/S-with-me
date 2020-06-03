import React, { PureComponent } from 'react';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Form from '../../../common-ui/Form';
import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';

export default class DeleteFolderPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(closeModal) {
    const { deleteFolder, requestFolderList, requestMyBookList, folderId, studentId } = this.props;
    deleteFolder(folderId * 1, () => {
      closeModal();
      requestFolderList({ studentId: studentId });
      requestMyBookList({ studentId: studentId });
    });
  }

  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Form onSubmit={() => this.handleSubmit(closeModal)}>
            <Form.Consumer>
              {() => (
                <Spacing horizontal={4} vertical={6}>
                  <Spacing bottom={2}>
                    <Text large>정말로 삭제하시겠습니까?</Text> <br />
                    <Text>폴더 내의 문제집은 분류되지 않음 폴더로 이동됩니다.</Text>
                  </Spacing>
                  <InlineList spacingBetween={1}>
                    <Button primary>삭제</Button>
                    <Button onPress={closeModal}>취소</Button>
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </Modal>
    );
  }
}
