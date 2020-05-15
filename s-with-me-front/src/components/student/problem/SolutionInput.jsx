import React, { PureComponent } from 'react';
import Input from '../../../common-ui/Input';
import Form from '../../../common-ui/Form';

export default class SolutionInput extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <Input
              type="text"
              name="textSolutionInput"
              label="텍스트 풀이 입력"
              onChange={onChange}
              value={values['mySolution']}
            />
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
