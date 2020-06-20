import React, * as react from 'react';
import logo from '../logo.png';
import user from '../user.png';
import './LoginApp.css';

import Input from '../common-ui/Input';
import Form from '../common-ui/Form';
import { Button } from 'semantic-ui-react';
import CheckBox from '../common-ui/CheckBox';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { Button as SemanticButton, Image, Modal } from 'semantic-ui-react';

class LoginApp extends react.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isStudent: false, isPublisher: false, isLogin: false, open: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const { setUser, history, setUserType, setLogged } = this.props;
    const { isStudent, isPublisher } = this.state;
    if (isStudent) {
      setUser(true, values, () => {
        history.push('/');
        window.sessionStorage.setItem('studentId', this.props.user.studentId);
        window.sessionStorage.setItem('grade', this.props.user.grade);
        window.sessionStorage.setItem('isSubscribing', this.props.user.isSubscribing);
        window.sessionStorage.setItem('name', this.props.user.name);
        this.setState({ isLogin: true });
        setUserType(true);
        setLogged(true);
      });
    }
    if (isPublisher) {
      setUser(false, values, () => {
        history.push('/');
        window.sessionStorage.setItem('publisherId', this.props.user.publisherId);
        this.setState({ isLogin: true });
        setUserType(false);
        setLogged(true);
      });
    }
  }
  show = () => () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { loading } = this.props;
    const { isStudent, isPublisher } = this.state;
    const { open } = this.state;

    if (this.state.isLogin) return <Redirect to="/library" />;

    return (
      <div className="login">
        <header className="loginHeader">
          <div id="install-button" hidden>
            <SemanticButton
              style={{ marginTop: '8%' }}
              icon="download"
              basic
              color="red"
              labelPosition="right"
              content="어플로 사용하기"
            />
          </div>
          <div className="logoSize">
            <img src={logo} className="content" alt="logo" />
          </div>
          <div className="loginSection">
            <div className="content">
              <div className="checkBox">
                <CheckBox
                  name="isStudnet"
                  font-color="red"
                  onChange={() => this.setState({ isStudent: !isStudent })}
                  checked={isStudent}
                  errorMessage={
                    (isPublisher && isStudent && '중복 선택') ||
                    (!isStudent && !isPublisher && '선택요망')
                  }
                >
                  학생
                </CheckBox>
                <CheckBox
                  name="isPublisher"
                  onChange={() => this.setState({ isPublisher: !isPublisher })}
                  checked={isPublisher}
                  errorMessage={
                    (isPublisher && isStudent && '중복 선택') ||
                    (!isStudent && !isPublisher && '선택요망')
                  }
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
                        <div className="inputCss">
                          <div className="inputID">
                            <Input name="id" onChange={onChange} placeholder="ID" />
                          </div>
                          <div style={{ paddingTop: 10 }} />
                          <div className="inputPW">
                            <Input
                              name="password"
                              onChange={onChange}
                              placeholder="Password"
                              type="password"
                            />
                          </div>
                        </div>
                        <Button
                          className="loginButton"
                          type="submit"
                          disabled={loading}
                          basic
                          circular
                          icon="sign in"
                          content="로그인"
                          color="black"
                        />
                      </div>
                      <div className="loginSignUp">
                        <Link to="/signup">
                          <Button basic icon="signup" color="black" content="학생으로 회원가입" />
                        </Link>
                        <Link to="/signup-publisher">
                          <Button basic icon="signup" color="black" content="출판사로 회원가입" />
                        </Link>
                      </div>
                    </div>
                  )}
                </Form.Consumer>
              </Form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(LoginApp);
