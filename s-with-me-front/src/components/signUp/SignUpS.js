import React, { PureComponent } from 'react';
import logo from '../../logo.png';
import './SignUpS.css';

import Button from '../../common-ui/Button';
import Form from '../../common-ui/Form';
import Input from '../../common-ui/Input';
import Text from '../../common-ui/Text';
import VerticalList from '../../common-ui/VerticalList';
import { Link, Redirect } from 'react-router-dom';

import { validate } from './validate.js';

export default class SignUpS extends PureComponent {
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
      checkIdDuplication(true, formValue, () => {
        this.setState({ isCheck: true });
      });
    }
  }
  handleSubmit(values) {
    const { createUser } = this.props;
    if (this.state.isValidForm) {
      createUser(true, values, () => this.setState({ registerComplete: true }));
    }
  }
  render() {
    const { loading, isOnlyId } = this.props;
    const { registerComplete, isCheck, currentUserId } = this.state;
    if (!registerComplete) {
      return (
        <div className="studentSignUp">
          <header className="header">
            <div className="logoStudent">
              <img src={logo} className="content" alt="logo" />
            </div>
            <div className="signUpSection">
              <div className="content">
                <div className="welcomeText">반갑습니다.</div>
                <div className="studentSignUpBox">
                  <Form onSubmit={values => this.handleSubmit(values)} >
                    <Form.Consumer>
                      {({ onChange, values }) => {
                        this.setState({ currentUserId: values['userId'] });
                        if (!values['userId']) this.setState({ isCheck: false });
                        let errors = validate(values, isCheck, isOnlyId);
                        if (!errors.length) this.setState({ isValidForm: true });
                        return (
                         
                            <div className="inputCssStudent">
                              <VerticalList spacingBetween={1}>
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
                                  name="name"
                                  placeholder="이름"
                                  onChange={onChange}
                                  errorMessage={errors['name']}
                                />

                                <Input
                                  name="birthday"
                                  placeholder="생년월일"
                                  onChange={onChange}
                                  errorMessage={errors['birthday']}
                                />

                                <Input
                                  name="phoneNumber"
                                  placeholder="핸드폰 번호"
                                  onChange={onChange}
                                  errorMessage={errors['phoneNumber']}
                                />

                                <Input
                                  type="number"
                                  name="grade"
                                  placeholder="학년"
                                  onChange={onChange}
                                  errorMessage={errors['grade']}
                                />

                                <div className="signUpButton">
                                <Link to="/">
                                    <Button small>로그인으로 돌아가기</Button>
                                  </Link>
                                  <Button type="submit" disabled={loading}>
                                    가입하기
                                  </Button>
                                </div>
                              </VerticalList>
                            </div>
                            
                          
                        );
                      }}
                    </Form.Consumer>
                  </Form>
                  <div className="checkID">
                              <Button
                                small
                                onPress={() => this.handleCheckDuplication(currentUserId)}
                              >
                                중복확인
                              </Button>
                              <div>
                                {isCheck &&
                                  (isOnlyId ? <Text>사용 가능</Text> : <Text>중복</Text>)}
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
