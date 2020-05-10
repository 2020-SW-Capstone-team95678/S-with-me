import React from 'react';
import { storiesOf } from '@storybook/react';
import Profile from '../components/student/profile/Profile';

storiesOf('Profile', module)
  .addWithJSX('Profile', () => <Profile />);