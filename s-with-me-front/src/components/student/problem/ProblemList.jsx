import React, { PureComponent } from 'react';

import VerticalList from '../../../common-ui/VerticalList';
import ProblemView from './ProblemView';

export default class ProblemList extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            <ProblemView problemNum={10} content="예시 객관식 문제입니다" isOptional />
          </VerticalList>
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            <ProblemView problemNum={11} content="예시 주관식 문제입니다" />
          </VerticalList>
        </div>
      </div>
    );
  }
}
