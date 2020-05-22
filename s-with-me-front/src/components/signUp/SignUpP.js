import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpP.css';

import Button from '../../common-ui/Button';
import Input from '../../common-ui/Input';
import CheckBox from '../../common-ui/CheckBox';


export default class Login extends PureComponent {
  render() {
    return (
      <div className="publisherSinpUp">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <div>
            <div className="welcomeText">
              <a>반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.
              </a>
            </div>
            <div className="publisherSignUpBox">
              <div className="signUp">
                <img src={user} className="userPublisherSignUp" alt="user" />
                <div className="signUpInput">
                  ID
                  <div className="inputCheck">
                     <Input>ID</Input>
                     <Button className="button" xsmall>중복</Button>
                  </div>
                  PW
                  <Input>PW</Input>
                  출판사 코드 : 영문숫자 조합 6자리
                  <div className="inputCheck">
                    <Input></Input>
                    <Button className="button" xsmall>인증</Button>
                  </div>
                </div>
                
              </div>
              <div className="signUpButtonP">
                <Button>로그인으로 돌아가기</Button>
                <Button >확인</Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
