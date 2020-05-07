import React from 'react';
import { storiesOf } from '@storybook/react';

import ProblemView from '../components/student/problem/ProblemView';
const options = ['1번 보기', '2번 보기', '3번 보기', '4번 보기', '5번 보기'];
storiesOf('Problem', module)
  .addWithJSX('Problem default', () => <ProblemView id={1} />)
  .addWithJSX('ProblemNum And Content', () => (
    <ProblemView id={1} problemNum={13} content="예시 문제입니다" />
  ))
  .addWithJSX('Optional Problem', () => (
    <ProblemView
      id={1}
      problemNum={13}
      content="예시 객관식 문제입니다"
      isOptional
      options={options}
    />
  ));
