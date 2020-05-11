import React from 'react';
import { storiesOf } from '@storybook/react';

import NoteApp from '../components/student/note/NoteApp';

storiesOf('Note/NoteApp', module).addWithJSX('Note App', () => <NoteApp />);
