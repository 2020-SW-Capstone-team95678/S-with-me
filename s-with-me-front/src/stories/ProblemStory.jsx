import React from 'react';
import { storiesOf } from '@storybook/react';

import ProblemView from '../components/student/problem/ProblemView';

storiesOf('Problem', module)
  .addWithJSX('Problem default', () => <ProblemView />)
  .addWithJSX('ProblemNum And Content', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" />
  ))
  .addWithJSX('Optional Problem', () => (
    <ProblemView problemNum={13} content="예시 객관식 문제입니다" isOptional />
  ))
  .addWithJSX('풀이 텍스트', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" solutionType="text" />
  ))
  .addWithJSX('풀이 손글씨', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" solutionType="hand" />
  ))
  .addWithJSX('풀이 이미지', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" solutionType="img" />
  ))
  .addWithJSX('풀이 링크', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" solutionType="link" />
  ));
