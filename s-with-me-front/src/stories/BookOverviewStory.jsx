import React from 'react';
import { storiesOf } from '@storybook/react';

import BookOverview from '../components/student/libarary/BookOverview';

storiesOf('Library/BookOverview', module).addWithJSX('overview default', () => <BookOverview />);
