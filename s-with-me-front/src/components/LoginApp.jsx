import React, * as react from 'react';
import logo from '../logo.png';
import user from '../user.png';
import '../App.css';

import Button from '../common-ui/Button';
import Input from '../common-ui/Input';
import CheckBox from '../common-ui/CheckBox';
import { Link } from 'react-router-dom';

export default class LoginApp extends react.PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <div className="App-checkBox">
              <CheckBox font-color="red">학생</CheckBox>
              <CheckBox>출판사</CheckBox>
            </div>
            <div className="App-loginBox">
              <div className="App-login">
                <img src={user} className="App-user" alt="user" />
                <div className="App-input">
                  <div className="App-inputID">
                    <a>ID</a>
                    <Input>ID</Input>
                  </div>
                  <div className="App-inputPW">
                    <a>PW</a>
                    <Input>PW</Input>
                  </div>
                </div>
                <Button>로그인</Button>
              </div>
              <div className="App-signUp">
                <Link to="/signup">
                  <Button>학생으로 회원가입</Button>
                </Link>
                <Button>출판사로 회원가입</Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
