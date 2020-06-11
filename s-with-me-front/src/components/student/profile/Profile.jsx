import React, { PureComponent } from 'react';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { S_PROFILE_EDIT_MODAL } from '../../../constants/modals';
import PayHistory from '../../student/profile/PayHistory';

import Api from '../../../Api';
import Button from '../../../common-ui/Button';

import './Profile.css';

export default class StudentProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: -1,
      birthday: '',
      phoneNumber: '',
    };
  }

  componentDidMount() {
    const studentId = window.sessionStorage.getItem('studentId');
    Api.get('student/profile', { params: { studentId } }).then(({ data }) => {
      this.setState({
        name: data.name,
        birthday: data.birthday,
        grade: data.grade,
        phoneNumber: data.phoneNumber,
      });
    });
  }
  


  render() {
    const { birthday, name, phoneNumber, grade } = this.state;

    return (
      <Modal>
        {({ openModal }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div
                style={{
                  height: 400,
                  flexDirection: 'column',
                  padding: 3,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <div>이름 : {name}</div>
                <div>생년월일 : {birthday}</div>
                <div>학년 : {grade}</div>
                <div>휴대폰번호 : {phoneNumber}</div>
                <Button onPress={() => openModal(S_PROFILE_EDIT_MODAL, { type: 'edit' })}>
                  나의 프로필 수정/저장
                </Button>
              </div>
            </div>

            <div
              style={{
                flex: 4,
                height: 800,
                flexDirection: 'column',
                padding: 3,
                border: '2px rgb(247, 207, 192) solid',
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Form.Consumer style={{display:'flex'}}>
                {({ onChange, values }) => (
                  <div style={{display:'flex'}}>
                  <InlineList spacingBetween={1} style={{flex:3 }}>
                    <Select name="PayFilter" onChange={onChange}>
                      <Option label="조회 기간 설정" />
                      <Option label="최근 30일" value="onemonth" />
                      <Option label="최근 6개월" value="sixmonth" />
                    </Select>
                  </InlineList>
                  <Button style={{flex:1}}>조회</Button>
                  </div>
                )}
              </Form.Consumer>
              <PayHistory />
              
            </div>
          </div>

        )}
      </Modal>
    );
  }
}
