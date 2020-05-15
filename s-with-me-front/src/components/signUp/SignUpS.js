import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpS.css';

import Button from '../../common-ui/Button';
import Input from '../../common-ui/Input';
import { Link } from 'react-router-dom';

export default class Login extends PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <div className="App-welcomeText">
              <a>반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.</a>
            </div>
            <div className="App-signUpBox">
              <div className="App-signUp">
                <img src={user} className="App-user" alt="user" />
                <div className="App-input">
                  <a>ID</a>
                  <div className="App-inputCheck">
                    <Input>ID</Input>
                    <Button xsmall>ID 중복확인</Button>
                  </div>

                  <a>PW</a>
                  <Input>PW</Input>
                  <a>생년월일 : 숫자만 6자리</a>
                  <Input></Input>
                  <a>휴대폰번호 : 숫자만 입력</a>
                  <div className="App-inputCheck">
                    <Input></Input>
                    <Button xsmall>번호 인증</Button>
                  </div>
                  <a>생년월일</a>
                  <Input></Input>
                  <a>학년</a>
                  <Input></Input>
                </div>
              </div>
              <div className="App-Button">
                <Link to="/">
                  <Button>로그인으로 돌아가기</Button>
                </Link>
                <Button>확인</Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
