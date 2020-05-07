import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';

export default class SolutionFilter extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <div>
              <Select name="solutionFilter" onChange={onChange}>
                <Option label="풀이 입력 방식을 선택하세요" />
                <Option label="텍스트로 입력" value="text" />
                <Option label="손글씨로 입력" value="hand" />
                <Option label="사진 첨부" value="img" />
                <Option label="링크 연결" value="link" />
              </Select>
            </div>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
