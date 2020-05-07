import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SolutionInput extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'hand', 'img', 'link']),
  };

  render() {
    const { type } = this.props;
    if (type === 'hand') {
      return <div>손글씨 풀이 입력</div>;
    } else if (type === 'img') {
      return <div>사진 첨부 풀이 입력</div>;
    } else if (type === 'link') {
      return <div>링크 풀이 입력</div>;
    } else {
      return <div>텍스트 풀이 입력</div>;
    }
  }
}
