import React, { useState } from 'react';

import { isMobile } from 'react-device-detect';
import { Redirect } from 'react-router-dom';
import logo from '../../logo.png';
import { Form, Button, Divider, Segment } from 'semantic-ui-react';
import { validate } from './validate';

export default function StudentSignUp(props) {
  const [complete, setComplete] = useState(false);
  const [userId, setId] = useState('');
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [grade, setGrade] = useState(0);
  const [passwrordError, setPasswordError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [gradeError, setGradeError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [nameError, setNameError] = useState(false);
  let errors;
  const gradeOptions = [
    { key: 1, value: 1, text: '1학년' },
    { key: 2, value: 2, text: '2학년' },
    { key: 3, value: 3, text: '3학년' },
  ];
  const handleId = (e, { value }) => {
    setId(value);
    setChecked(false);
  };
  const handlePassword = (e, { value }) => setPassword(value);
  const handleName = (e, { value }) => setUserName(value);
  const handleBirthDate = (e, { value }) => setBirthDate(value);
  const handlePhoneNumber = (e, { value }) => setPhoneNumber(value);
  const handleGrade = (e, { value }) => setGrade(value);

  const handleSubmit = () => {
    const form = {
      userId: userId,
      password: password,
      name: userName,
      birthday: birthDate,
      phoneNumber: phoneNumber,
      grade: grade,
    };
    errors = validate(form);
    if (errors || !checked || !props.isOnlyId) {
      setIdError(errors['userId']);
      setPasswordError(errors['password']);
      setGradeError(errors['grade']);
      setNameError(errors['name']);
      setPhoneNumberError(errors['phoneNumber']);
      setBirthDateError(errors['birthday']);
    }
    if (errors || errors.length === 0) {
      if (checked && props.isOnlyId) {
        props.createUser(true, form, () => setComplete(true));
      }
    }
  };

  const handleCheckDuplication = () => {
    setChecked(false);
    const { checkIdDuplication } = props;
    const formValue = { userId: userId };
    if (userId) {
      checkIdDuplication(true, formValue, () => {
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
            style={{ width: isMobile ? '50%' : '15%', height: 'auto' }}
          />
        </header>
        <Divider />
        <div style={{ padding: 10 }}>
          <Segment>
            <Form size={isMobile ? 'mini' : 'tiny'} onSubmit={handleSubmit}>
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
                error={passwrordError}
              />
              <Form.Input
                placeholder="name"
                label="이름"
                value={userName}
                onChange={handleName}
                error={nameError}
              />
              <Form.Input
                placeholder="ex)990101"
                label="생년월일"
                value={birthDate}
                onChange={handleBirthDate}
                error={birthDateError}
              />
              <Form.Input
                placeholder="ex)01012341234"
                label="휴대폰 번호"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                error={phoneNumberError}
              />
              <Form.Select
                options={gradeOptions}
                placeholder="학년 선택"
                onChange={handleGrade}
                label="학년"
                error={gradeError}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  basic
                  color="orange"
                  icon="sign-in"
                  content="가입하기"
                  display={props.loading}
                />
              </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
              <Button basic color="grey" icon="sign-in" content="로그인 화면으로 돌아가기" />
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}
