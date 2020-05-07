import React from 'react';
import { storiesOf } from '@storybook/react';
import SignUpStudent from '../components/signUp/SignUpS';
import SignUpPublisher from '../components/signUp/SignUpP';
import Login from '../App';

storiesOf('SignUp', module)
  .addWithJSX('Student', () => <SignUpStudent />)
  .addWithJSX('Publiser', () => <SignUpPublisher />)
  .addWithJSX('Login', () => <Login />);
