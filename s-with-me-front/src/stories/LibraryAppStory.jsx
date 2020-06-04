import React from 'react';
import { storiesOf } from '@storybook/react';
import StudentLibraryApp from '../components/student/libarary/LibraryApp';
import PublisherLibraryApp from '../components/publisher/library/LibraryApp';
import BookDetail from '../components/student/libarary/BookDetail';

storiesOf('Library/LibraryApp', module)
  .addWithJSX('Student', () => <StudentLibraryApp />)
  .addWithJSX('Publiser', () => <PublisherLibraryApp />)
  .addWithJSX('BookDetail', () => <BookDetail />);
