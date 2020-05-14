import React from 'react';
import { storiesOf } from '@storybook/react';
import StudentProfile from '../components/student/profile/Profile';
import PublisherProfile from '../components/publisher/profile/Profile';

storiesOf('Profile', module)
  .addWithJSX('StudentProfile', () => <StudentProfile />)
  .addWithJSX('PublisherProfile', () => <PublisherProfile />);