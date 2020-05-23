import React, * as react from 'react';
import logo from '../logo.png';
import user from '../user.png';
import '../App.css';

import Input from '../common-ui/Input';
import Form from '../common-ui/Form';
import Button from '../common-ui/Button';
import CheckBox from '../common-ui/CheckBox';
import { Link, Redirect } from 'react-router-dom';

export default class LoginApp extends react.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isStudent: false, isPublisher: false, isLogin: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const { setUser } = this.props;
    const { isStudent } = this.state;
    console.log(values);
    if (isStudent) {
      setUser(values, () => {
        this.setState({ isLogin: true });
      });
    }
  }
  render() {
    const { loading } = this.props;
    const { isStudent, isPublisher, isLogin } = this.state;
    if (!isLogin) {
      return (
        <div className="login">
          <header className="loginHeader">
            <img src={logo} className="logo" alt="logo" />
            <div>
              <div className="checkBox">
                <CheckBox
                  name="isStudnet"
                  font-color="red"
                  onChange={() => this.setState({ isStudent: !isStudent })}
                  checked={isStudent}
                >
                  학생
                </CheckBox>
                <CheckBox
                  name="isPublisher"
                  onChange={() => this.setState({ isPublisher: !isPublisher })}
                  checked={isPublisher}
                >
                  출판사
                </CheckBox>
              </div>
              <Form onSubmit={values => this.handleSubmit(values)}>
                <Form.Consumer>
                  {({ onChange }) => (
                    <div className="mainBox">
                      <div className="loginInput">
                        <img src={user} className="userLogin" alt="user" />
                        <div className="input">
                          <div className="inputID">
                            ID
                            <Input name="id" onChange={onChange} />
                          </div>
                          <div className="inputPW">
                            PW
                            <Input name="password" onChange={onChange} />
                          </div>
                        </div>
                        <Button type="submit" disabled={loading}>
                          로그인
                        </Button>
                      </div>
                      <div className="loginSignUp">
                        <Link to="/signup">
                          <Button>학생으로 회원가입</Button>
                        </Link>
                        <Button>출판사로 회원가입</Button>
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
      return <Redirect to="/library" />;
    }
  }
}
