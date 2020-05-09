import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';

export default class SolutionFilter extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ values }) => (
            <InlineList spacingBetween={1}>
              <Button
                onPress={() => {
                  values['solutionType'] = 'text';
                }}
                type="submit"
                small
              >
                텍스트 풀이 입력
              </Button>
              <Button
                onPress={() => {
                  values['solutionType'] = 'hand';
                }}
                type="submit"
                small
              >
                손글씨 풀이 입력
              </Button>
              <Button
                onPress={() => {
                  values['solutionType'] = 'img';
                }}
                type="submit"
                small
              >
                사진 첨부
              </Button>
              <Button
                onPress={() => {
                  values['solutionType'] = 'link';
                }}
                type="submit"
                small
              >
                링크 연결하기
              </Button>
            </InlineList>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
