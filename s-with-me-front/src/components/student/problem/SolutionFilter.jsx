import React, { PureComponent } from 'react';

import InlineList from '../../../common-ui/InlineList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export default class SolutionFilter extends PureComponent {
  render() {
    const { id, setSolutionType } = this.props;
    return (
      <InlineList spacingBetween={5}>
        <div onClick={() => setSolutionType(id, 'text')}>
          <FontAwesomeIcon icon={faAlignLeft} size="lg" />
          텍스트 풀이 입력
        </div>
        <div onClick={() => setSolutionType(id, 'img')}>
          <FontAwesomeIcon icon={faCamera} size="lg" />
          사진 첨부 하기
        </div>
        <div onClick={() => setSolutionType(id, 'link')}>
          <FontAwesomeIcon icon={faPaperclip} size="lg" />
          링크 연결하기
        </div>
        <div onClick={() => setSolutionType(id, 'hand')}>
          <FontAwesomeIcon icon={faPaperclip} size="lg" />
          손글씨 입력
        </div>
      </InlineList>
    );
  }
}
