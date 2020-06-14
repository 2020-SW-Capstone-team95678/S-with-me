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
          <div className="logoPublisher">
              <img src={logo} className="content" />
            </div>
            <div className="signUpSectionP">
              <div className="content">
              <div className="welcomeText">
                반갑습니다.
              </div>
              <div className="publisherSignUpBox">
                <div className="signUp" style={{ display: 'flex', alignItems: 'stretch' }}>
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
                              <div className="inputCssPublisher">
                                <VerticalList spacingBetween={1} >
                                  <Input
                                    name="userId"
                                    placeholder="ID"
                                    onChange={onChange}
                                    errorMessage={errors['userId']}
                                  />
                                  <Input
                                    name="password"
                                    placeholder="PW"
                                    type="password"
                                    onChange={onChange}
                                    errorMessage={errors['password']}
                                  />
                                  <Input
                                    name="code"
                                    placeholder="출판사 코드"
                                    onChange={onChange}
                                    errorMessage={errors['code']}
                                  />
                                </VerticalList>
                                <div className="signUpButton">
                                <Button type="submit" disabled={loading}>
                                제출
                                </Button>
                               
                    <Link to="/">
                      <Button small>로그인으로 돌아가기</Button>
                    </Link>
                    </div>
                              </div>
                            );
                          }}
                        </Form.Consumer>
                      </Form>
                    </div>
                  </div>
                  <div
                    className="inputCheck"
                   
                  >
                    <br />
                    <Button small onPress={() => this.handleCheckDuplication(currentUserId)}>
                      검사
                    </Button>
                    
                    <div>
                      {isCheck && (isOnlyId ? <Text>사용 가능</Text> : <Text>아이디 중복</Text>)}
                    </div>
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
