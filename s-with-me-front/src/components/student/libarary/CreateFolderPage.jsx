import React, { PureComponent } from 'react';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Form from '../../../common-ui/Form';
import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import Input from '../../../common-ui/Input';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';

export default class CreateFolderPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, closeModal) {
    const { createFolder, requestFolderList, studentId } = this.props;
    const formValue = {
      studentId: studentId * 1,
      folderName: values.folderName,
    };
    createFolder(formValue, () => {
      closeModal();
      requestFolderList({ studentId: studentId });
    });
  }

  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Form onSubmit={values => this.handleSubmit(values, closeModal)}>
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={6}>
                  <Spacing bottom={2}>
                    <Text large>폴더 이름을 입력하세요</Text>
                    <Input name="folderName" value={values['folderName']} onChange={onChange} />
                  </Spacing>
                  <InlineList spacingBetween={1}>
                    <Button primary>생성</Button>
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
