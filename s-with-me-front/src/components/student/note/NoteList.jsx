import React, { PureComponent } from 'react';

import VerticalList from '../../../common-ui/VerticalList';
import NoteView from './NoteView';

export default class ProblemList extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            <NoteView problemNum={10} content="예시 객관식 문제입니다" isOptional isNote />
          </VerticalList>
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            <NoteView problemNum={11} content="예시 주관식 문제입니다" isNote />
          </VerticalList>
        </div>
      </div>
    );
  }
}
