import React from 'react';
import { storiesOf } from '@storybook/react';
import StudentLibraryApp from '../components/student/libarary/LibraryApp';
import PublisherLibraryApp from '../components/publisher/library/LibraryApp';

storiesOf('Library/LibraryApp', module)
  .addWithJSX('Student', () => <StudentLibraryApp />)
  .addWithJSX('Publiser', () => <PublisherLibraryApp />);
