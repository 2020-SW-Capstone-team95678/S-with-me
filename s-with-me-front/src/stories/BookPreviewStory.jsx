import React from 'react';
import { storiesOf } from '@storybook/react';
import BookPreview from '../components/student/libarary/BookPreview';

storiesOf('Library/BookPreview', module).addWithJSX('기본', () => (
  <BookPreview name="기본문제집" />
));
