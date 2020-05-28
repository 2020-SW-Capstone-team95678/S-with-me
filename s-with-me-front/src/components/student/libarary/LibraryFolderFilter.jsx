import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';
import Button from '../../../common-ui/Button';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { CREATE_FOLDER } from '../../../constants/modals';

export default class LibraryFolderFilter extends PureComponent {
  render() {
    const studentId = window.sessionStorage.getItem('studentId');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form onSubmit={values => console.log(values)}>
          <Form.Consumer>
            {({ onChange, values }) => (
              <Select name="libFilter" onChange={onChange}>
                <Option label="정렬 방식을 선택하세요" value="" />
                <Option label="과목별로 분류" value="subject" />
                <Option label="폴더별로 분류" value="folder" />
                <Option label="구입순으로 정렬" value="latest" />
                <Option label="가나다순으로 정렬" value="alphabet" />
              </Select>
            )}
          </Form.Consumer>
        </Form>
        <Modal>
          {({ openModal }) => (
            <Button xsmall onPress={() => openModal(CREATE_FOLDER, { studentId: studentId })}>
              폴더 생성
            </Button>
          )}
        </Modal>
      </div>
    );
  }
}
