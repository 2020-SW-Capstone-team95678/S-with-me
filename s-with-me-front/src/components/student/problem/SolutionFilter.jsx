import React, { PureComponent } from 'react';

import InlineList from '../../../common-ui/InlineList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export default class SolutionFilter extends PureComponent {
  render() {
    return (
      <InlineList spacingBetween={5}>
        <div onClick={() => this.props.selectSolutionFilterType('text')}>
          <FontAwesomeIcon icon={faAlignLeft} size="lg" />
          텍스트 풀이 입력
        </div>
        <div onClick={() => this.props.selectSolutionFilterType('img')}>
          <FontAwesomeIcon icon={faCamera} size="lg" />
          사진 첨부 하기
        </div>
        <div onClick={() => this.props.selectSolutionFilterType('link')}>
          <FontAwesomeIcon icon={faPaperclip} size="lg" />
          링크 연결하기
        </div>
      </InlineList>
    );
  }
}
