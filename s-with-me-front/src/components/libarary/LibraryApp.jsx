import React, { PureComponent } from 'react';
import AppLayout from '../AppLayout';
import BookOverview from './BookOverview';

export default class LibraryApp extends PureComponent {
  render() {
    return (
      <AppLayout>
        <BookOverview />
      </AppLayout>
    );
  }
}
