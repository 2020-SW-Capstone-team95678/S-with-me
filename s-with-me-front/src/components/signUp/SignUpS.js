import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpS.css';

import Button from '../../common-ui/Button';
import { Link } from 'react-router-dom';
import Api from '../../Api';

export default class SignUpS extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      phoneNumber: '',
      name: '',
      grade: '',
      birthDay: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { setUser } = this.props;
    const thisUser = this.state;
    return (
      <div className="studentSignUp">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <div>
            <div className="welcomeText">
              반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.
            </div>
            <div className="studentSignUpBox">
              <div className="signUp">
                <img src={user} className="userStudentSignUp" alt="user" />
                <div className="signUpInput">
                  ID
                  <div className="inputCheck">
                    <input name="userId" onChange={this.handleChange} />
                    <Button className="button" xsmall>중복</Button>
                  </div>
                  PW
                  <input name="password" onChange={this.handleChange} />
                  이름
                  <input name="name" onChange={this.handleChange} />
                  생년월일 : 숫자만 6자리
                  <input name="birthDay" onChange={this.handleChange} />
                  휴대폰번호 : 숫자만 입력
                  <div className="inputCheck">
                    <input name="phoneNumber" onChange={this.handleChange} />
                  </div>
                  학년
                  <input name="grade" onChange={this.handleChange} />
                </div>
              </div>
              <div className="signUpButton">
                <Link to="/">
                  <Button>로그인으로 돌아가기</Button>
                </Link>
                <Button
                  onPress={() => {
                    setUser(thisUser);
                    Api.post('/student/signup', thisUser)
                      .then(response => console.log(response))
                      .catch(error => console.log(error));
                  }}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
