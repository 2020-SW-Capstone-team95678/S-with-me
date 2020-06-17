import React, { PureComponent } from 'react';

import { Button, Dropdown, Modal, Input } from 'semantic-ui-react';

export default class LibraryFilter extends PureComponent {
  state = { open: false, folderName: '' };
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.selectFilter(value);
  };
  handleInputChange = (e, { value }) => {
    this.setState({ folderName: value });
  };
  handleSubmit = studentId => {
    const formValue = { folderName: this.state.folderName, studentId: studentId };
    const { createFolder, requestFolderList } = this.props;
    createFolder(formValue, () => {
      this.close();
      requestFolderList({ studentId: studentId });
    });
  };
  render() {
    const { value, open } = this.state;
    const studentId = window.sessionStorage.getItem('studentId');
    const options = [
      { key: 1, text: '과목 별로 분류', value: 'subject' },
      { key: 2, text: '폴더별로 분류', value: 'folder' },
      { key: 3, text: '구입 순으로 정렬', value: 'latest' },
      { key: 4, text: '가나다 순으로 정렬', value: 'alphabet' },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 10,
          alignItems: 'center',
        }}
      >
        <Dropdown
          floating
          name="libraryFilter"
          onChange={this.handleChange}
          options={options}
          placeholder="정렬방식 선택하기"
          value={value}
          selection
        />
        {value === 'folder' ? (
          <div style={{ paddingTop: 5 }}>
            <Button
              circular
              size="tiny"
              basic
              color="black"
              icon="add"
              content="폴더 생성"
              onClick={this.show}
            />
            <Modal size="tiny" dimmer="inverted" open={open} onClose={this.close}>
              <Modal.Content>
                <p>새로 만들 폴더의 이름을 입력하세요.</p>
                <Input fluid onChange={this.handleInputChange} placeholder="enter..." />
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={this.close} content="취소" />
                <Button
                  onClick={() => this.handleSubmit(studentId)}
                  type="submit"
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="폴더 생성"
                />
              </Modal.Actions>
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}
