import React from 'react';
import { storiesOf } from '@storybook/react';

import ProblemApp from '../components/student/problem/ProblemApp';

storiesOf('Problem/ProblemApp', module).addWithJSX('default problem app', () => <ProblemApp />);
