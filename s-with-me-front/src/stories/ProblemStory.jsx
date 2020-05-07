import React from 'react';
import { storiesOf } from '@storybook/react';

import ProblemView from '../components/student/problem/ProblemView';
const options = ['1번 보기', '2번 보기', '3번 보기', '4번 보기', '5번 보기'];

storiesOf('Problem', module)
  .addWithJSX('Problem default', () => <ProblemView />)
  .addWithJSX('ProblemNum And Content', () => (
    <ProblemView problemNum={13} content="예시 문제입니다" />
  ))
  .addWithJSX('Optional Problem', () => (
    <ProblemView problemNum={13} content="예시 객관식 문제입니다" isOptional options={options} />
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
