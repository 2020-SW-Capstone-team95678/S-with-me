import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import user from '../../user.png';
import './SignUpP.css';

import Button from '../../common-ui/Button';
import Form from '../../common-ui/Form';
import Input from '../../common-ui/Input';
import Text from '../../common-ui/Text';
import VerticalList from '../../common-ui/VerticalList';
import { Link, Redirect } from 'react-router-dom';

import { validate } from './validate.js';

export default class SignUpP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { registerComplete: false, isCheck: false, currentUserId: '', isValidForm: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckDuplication = this.handleCheckDuplication.bind(this);
  }
  handleCheckDuplication(value) {
    const { checkIdDuplication } = this.props;
    const formValue = { userId: value };
    if (value) {
      checkIdDuplication(false, formValue, () => {
        this.setState({ isCheck: true });
      });
    }
  }
  handleSubmit(values) {
    const { createUser } = this.props;
    if (this.state.isValidForm) {
      createUser(false, values, () => this.setState({ registerComplete: true }));
    }
  }
  render() {
    const { loading, isOnlyId } = this.props;
    const { registerComplete, isCheck, currentUserId } = this.state;
    if (!registerComplete) {
      return (
        <div className="publisherSignUp">
          <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <div>
              <div className="welcomeText">
                반갑습니다. 간단한 회원가입 후 스윗미와 함께하실 수 있습니다.
              </div>
              <div className="publisherSignUpBox">
                <div className="signUp" style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div style={{ flex: 2 }}>
                    <img src={user} style={{ width: 100 }} alt="user" />
                  </div>
                  <div style={{ flex: 3 }}>
                    <div
                      className="signUpInput"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <Form onSubmit={values => this.handleSubmit(values)}>
                        <Form.Consumer>
                          {({ onChange, values }) => {
                            this.setState({ currentUserId: values['userId'] });
                            if (!values['userId']) this.setState({ isCheck: false });
                            let errors = validate(values, isCheck, isOnlyId);
                            if (!errors.length) this.setState({ isValidForm: true });
                            return (
                              <div className="input">
                                <VerticalList spacingBetween={1}>
                                  <Input
                                    name="userId"
                                    label="ID"
                                    onChange={onChange}
                                    errorMessage={errors['userId']}
                                  />
                                  <Input
                                    name="password"
                                    label="PW"
                                    type="password"
                                    onChange={onChange}
                                    errorMessage={errors['password']}
                                  />
                                  <Input
                                    name="code"
                                    label="출판사 코드"
                                    onChange={onChange}
                                    errorMessage={errors['code']}
                                  />
                                </VerticalList>
                                <Link to="/">
                                  <Button>로그인으로 돌아가기</Button>
                                </Link>
                                <Button type="submit" disabled={loading}>
                                  확인
                                </Button>
                              </div>
                            );
                          }}
                        </Form.Consumer>
                      </Form>
                    </div>
                  </div>
                  <div className="inputCheck" style={{ flex: 1 }}>
                    <Button small onPress={() => this.handleCheckDuplication(currentUserId)}>
                      중복 확인
                    </Button>
                    <div>
                      {isCheck &&
                        (isOnlyId ? (
                          <Text>사용 가능한 아이디입니다. </Text>
                        ) : (
                          <Text>중복된 아이디입니다.</Text>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
