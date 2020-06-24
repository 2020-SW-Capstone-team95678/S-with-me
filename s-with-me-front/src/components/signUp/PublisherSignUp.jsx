import React, { useState } from 'react';

import { Redirect, Link } from 'react-router-dom';
import logo from '../../logo.png';
import { Form, Button, Divider, Segment } from 'semantic-ui-react';
import { publisherValidate } from './validate';

export default function PublisherSignUp(props) {
  const [complete, setComplete] = useState(false);
  const [userId, setId] = useState('');
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  let errors;
  const handleId = (e, { value }) => {
    setId(value);
    setChecked(false);
  };
  const handlePassword = (e, { value }) => setPassword(value);
  const handleName = (e, { value }) => setUserName(value);
  const handleCode = (e, { value }) => setCode(value);

  const handleSubmit = () => {
    const form = {
      userId: userId,
      password: password,
      name: userName,
      code: code,
    };
    errors = publisherValidate(form);
    if (errors || !checked || !props.isOnlyId) {
      setIdError(errors['userId']);
      setPasswordError(errors['password']);
      setNameError(errors['name']);
      setCodeError(errors['code']);
    }
    if (errors || errors.length === 0) {
      if (checked && props.isOnlyId) {
        props.createUser(false, form, () => setComplete(true));
      }
    }
  };

  const handleCheckDuplication = () => {
    setChecked(false);
    const { checkIdDuplication } = props;
    const formValue = { userId: userId };
    if (userId) {
      checkIdDuplication(false, formValue, () => {
        setChecked(true);
      });
    }
  };
  if (complete) return <Redirect to="/" />;
  else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <header style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={logo}
            className="content"
            alt="logo"
            style={{
              width: '20%',
              height: '20%',
              resize: 'none',
            }}
          />
        </header>
        <Divider />
        <div style={{ padding: 10 }}>
          <Segment>
            <Form size="tiny" onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input
                  placeholder="id"
                  label="ID"
                  value={userId}
                  onChange={handleId}
                  error={idError}
                />
                <Form.Checkbox
                  error={!checked || !props.isOnlyId}
                  label={
                    checked && props.isOnlyId
                      ? '사용 가능'
                      : checked
                      ? '사용 불가'
                      : '중복확인 검사를 해주세요'
                  }
                  checked={checked && props.isOnlyId}
                  onClick={handleCheckDuplication}
                />
              </Form.Field>
              <Form.Input
                type="password"
                placeholder="password"
                label="비밀번호"
                value={password}
                onChange={handlePassword}
                error={passwordError}
              />
              <Form.Input
                placeholder="name"
                label="이름"
                value={userName}
                onChange={handleName}
                error={nameError}
              />
              <Form.Input
                placeholder="code"
                type="number"
                label="출판사 코드"
                value={code}
                onChange={handleCode}
                error={codeError}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  basic
                  color="orange"
                  icon="sign-in"
                  content="가입하기"
                  disabled={props.loading}
                />
              </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
              <Link to="/">
                <Button basic color="grey" icon="sign-in" content="로그인 화면으로 돌아가기" />
              </Link>
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}
