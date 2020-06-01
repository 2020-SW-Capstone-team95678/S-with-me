import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export default class SolutionFilter extends PureComponent {
  render() {
    return (
      <Form onSubmit={values => console.log(values)}>
        <Form.Consumer>
          {({ values }) => (
            <InlineList spacingBetween={1}>
              <Button>
                <FontAwesomeIcon icon={faAlignLeft} size="lg" />
                텍스트 풀이 입력
              </Button>
              <Button>
                <FontAwesomeIcon icon={faCamera} size="lg" />
                사진 첨부 하기
              </Button>
              <Button>
                <FontAwesomeIcon icon={faPaperclip} size="lg" />
                링크 연결하기
              </Button>
            </InlineList>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
