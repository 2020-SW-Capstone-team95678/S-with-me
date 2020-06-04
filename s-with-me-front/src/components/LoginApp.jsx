import React, * as react from 'react';
import logo from '../logo.png';
import user from '../user.png';
import '../App.css';

import Input from '../common-ui/Input';
import Form from '../common-ui/Form';
import Button from '../common-ui/Button';
import CheckBox from '../common-ui/CheckBox';
import { Link, Redirect, withRouter } from 'react-router-dom';

class LoginApp extends react.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isStudent: false, isPublisher: false, isLogin: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    const { setUser, history, setUserType, setLogged } = this.props;
    const { isStudent, isPublisher } = this.state;
    if (isStudent) {
      setUser(true, values, () => {
        history.push('/');
        window.sessionStorage.setItem('studentId', this.props.user.studentId);
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

  render() {
    const { loading } = this.props;
    const { isStudent, isPublisher } = this.state;

    if (this.state.isLogin && isStudent) return <Redirect to="/library" />;
    if (this.state.isLogin && isPublisher) return <Redirect to="/library" />;

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
                      <div className="input">
                        <div className="inputID">
                          ID
                          <Input name="id" onChange={onChange} />
                        </div>
                        <div className="inputPW">
                          PW
                          <Input name="password" onChange={onChange} type="password" />
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
                      <Link to="/signup-publisher">
                        <Button>출판사로 회원가입</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </Form.Consumer>
            </Form>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(LoginApp);
