import React, { useState, useEffect } from 'react';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { S_PROFILE_EDIT_MODAL } from '../../../constants/modals';
import PayHistory from '../../student/profile/PayHistory';
import Api from '../../../Api';
import { Button } from 'semantic-ui-react';

import './Profile.css';

export const StudentProfile =()=>  {
  const studentId = window.sessionStorage.getItem('studentId');
  const [profile,setProfile]=useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const data= await Api.get('student/profile', { params: { studentId } })
        setProfile(data.data);
      
    };
    if (studentId) {
      fetchData();
    }
  }, [studentId]);

    

    return (
      <Modal>
        {({ openModal }) => (
          <div className="totalBox" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div
                style={{
                  flexDirection: 'column',
                  padding: 10,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius: 10,
                  alignItems: 'center',
                  minWidth: 250,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                  <div style={{ flexmargin: 5, fontWeight: 'bold', fontSize: 20 }}>{profile.name}님 |</div>
                  <div> {profile.isSubscribing ? '스윗미 가족' : '스윗미 방문자'}</div>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    borderRadius: 5,
                    backgroundColor: 'rgb(247, 207, 192)',
                  }}
                >
                  내 정보
                </div>
                <div style={{ margin: 5 }}>생년월일 : {profile.birthday}</div>
                <div style={{ margin: 5 }}>학년 : {profile.grade}</div>
                <div style={{ margin: 5 }}>휴대폰번호 : {profile.phoneNumber}</div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    basic
                    color="black"
                    style={{ marginTop: 10 }}
                    onClick={() => openModal(S_PROFILE_EDIT_MODAL, { type: 'edit', 
                    studentId:studentId, birthday:profile.birthday, profile,name:profile.name, prevPhone:profile.phoneNumber, prevGrade:profile.grade, 
                    doneCallback: changeProfile => {
                      console.log(changeProfile.profile);
                      setProfile(changeProfile.profile);
                    },})}
                  >
                    나의 프로필 수정/저장
                  </Button>

                </div>
              </div>
            </div>

            <div className="payHistory">
              <Form.Consumer style={{ display: 'flex' }}>
                {({ onChange, values }) => (
                  <div style={{ display: 'flex' }}>
                    <InlineList spacingBetween={1} style={{ flex: 3 }}>
                      <Select name="PayFilter" onChange={onChange}>
                        <Option label="조회 기간 설정" value=" " />
                        <Option label="최근 30일" value="onemonth" />
                        <Option label="최근 6개월" value="sixmonth" />
                      </Select>
                    </InlineList>
                    <Button basic size="mini" color="black">
                      조회
                    </Button>
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
export default StudentProfile