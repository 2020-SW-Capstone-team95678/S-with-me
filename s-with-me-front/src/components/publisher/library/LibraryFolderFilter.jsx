import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';

export default class LibraryFolderFilter extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <Select name="libFilter" onChange={onChange}>
              <Option label="정렬 방식을 선택하세요" />
              <Option label="과목별로 분류" value="subject" />
              <Option label="학년별로 분류" value="grade" />
              <Option label="가나다순으로 정렬" value="alphabet" />
            </Select>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
