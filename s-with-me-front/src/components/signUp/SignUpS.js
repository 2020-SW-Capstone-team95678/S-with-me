import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpS.css';

import Button from '../../common-ui/Button';
import Form from '../../common-ui/Form';
import Input from '../../common-ui/Input';
import { Link, Redirect } from 'react-router-dom';

export default class SignUpS extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { registerComplete: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { createUser } = this.props;
    createUser(values, () => this.setState({ registerComplete: true }));
  }
  render() {
    const { loading } = this.props;
    const { registerComplete } = this.state;
    if (!registerComplete) {
      return (
        <div className="studentSignUp">
          <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <div>
              <div className="welcomeText">
                반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.
              </div>
              <Form onSubmit={values => this.handleSubmit(values)}>
                <Form.Consumer>
                  {({ onChange }) => (
                    <div className="studentSignUpBox">
                      <div className="signUp">
                        <img src={user} className="userStudentSignUp" alt="user" />
                        <div className="signUpInput">
                          ID
                          <div className="inputCheck">
                            <Input name="userId" onChange={onChange} />
                            <Button className="button" xsmall>
                              중복
                            </Button>
                          </div>
                          PW
                          <Input name="password" onChange={onChange} />
                          이름
                          <Input name="name" onChange={onChange} />
                          생년월일 : 숫자만 6자리
                          <Input name="birthday" onChange={onChange} />
                          휴대폰번호 : 숫자만 입력
                          <div className="inputCheck">
                            <Input name="phoneNumber" onChange={onChange} />
                          </div>
                          학년
                          <Input name="grade" onChange={onChange} />
                        </div>
                      </div>
                      <div className="signUpButton">
                        <Link to="/">
                          <Button>로그인으로 돌아가기</Button>
                        </Link>
                        <Button type="submit" disabled={loading}>
                          확인
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.Consumer>
              </Form>
            </div>
          </header>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
