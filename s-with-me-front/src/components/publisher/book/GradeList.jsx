import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';

export default class GradeList extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <Select name="libFilter" onChange={onChange}>
              <Option label="학년을 선택하세요" />
              <Option label="1학년" value="grade1" />
              <Option label="2학년" value="grade2" />
              <Option label="3학년" value="grade3" />
            </Select>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}