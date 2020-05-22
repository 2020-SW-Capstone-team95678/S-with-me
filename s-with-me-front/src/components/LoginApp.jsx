import React, * as react from 'react';
import logo from '../logo.png';
import user from '../user.png';
import '../App.css';

import Input from '../common-ui/Input';
import Form from '../common-ui/Form';
import Button from '../common-ui/Button';
import CheckBox from '../common-ui/CheckBox';
import { Link } from 'react-router-dom';

export default class LoginApp extends react.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isStudent: false, isPublisher: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const { setUser } = this.props;
    const { isStudent } = this.state;
    if (isStudent) {
      setUser(values, () => <Link to="/library" />);
    }
  }
  render() {
    const { loading } = this.props;
    const { isStudent, isPublisher } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <div className="App-checkBox">
              <CheckBox
                font-color="red"
                onChange={() => this.setState({ isStudent: !isStudent })}
                checked={isStudent}
              >
                학생
              </CheckBox>
              <CheckBox
                onChange={() => this.setState({ isPublisher: !isPublisher })}
                checked={isPublisher}
              >
                출판사
              </CheckBox>
            </div>
            <div className="App-loginBox">
              <div className="App-login">
                <img src={user} className="App-user" alt="user" />
                <Form onSubmit={values => this.handleSubmit(values)}>
                  <Form.Consumer>
                    {({ onChange }) => (
                      <div className="App-input">
                        <div className="App-inputID">
                          ID
                          <Input name="userId" onChange={onChange} />
                        </div>
                        <div className="App-inputPW">
                          PW
                          <input name="password" onChange={onChange} />
                        </div>
                        <Button type="submit" disabled={loading}>
                          로그인
                        </Button>
                      </div>
                    )}
                  </Form.Consumer>
                </Form>
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
