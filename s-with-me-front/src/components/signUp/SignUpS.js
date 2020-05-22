import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpS.css';

import Button from '../../common-ui/Button';
import Form from '../../common-ui/Form';
import Input from '../../common-ui/Input';
import { Link } from 'react-router-dom';

export default class SignUpS extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { createUser } = this.props;
    createUser(values, () => <Link to="/" />);
  }
  render() {
    const { loading } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <div className="App-welcomeText">
              반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.
            </div>
            <div className="App-signUpBox">
              <div className="App-signUp">
                <img src={user} className="App-user" alt="user" />
                <Form onSubmit={values => this.handleSubmit(values)}>
                  <Form.Consumer>
                    {({ onChange }) => (
                      <div className="App-input">
                        ID
                        <div className="App-inputCheck">
                          <Input name="userId" onChange={onChange} />
                          <Button xsmall>ID 중복확인</Button>
                        </div>
                        PW
                        <Input name="password" onChange={onChange} />
                        이름
                        <Input name="name" onChange={onChange} />
                        생년월일 : 숫자만 6자리
                        <Input name="birthDay" onChange={onChange} />
                        휴대폰번호 : 숫자만 입력
                        <div className="App-inputCheck">
                          <Input name="phoneNumber" onChange={onChange} />
                        </div>
                        학년
                        <Input name="grade" onChange={onChange} />
                        <Button type="submit" disabled={loading} primary>
                          확인
                        </Button>
                      </div>
                    )}
                  </Form.Consumer>
                </Form>
              </div>
              <div className="App-Button">
                <Link to="/">
                  <Button>로그인으로 돌아가기</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
