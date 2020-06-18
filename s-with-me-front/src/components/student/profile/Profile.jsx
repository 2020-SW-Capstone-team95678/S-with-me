import React, { PureComponent } from 'react';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { S_PROFILE_EDIT_MODAL } from '../../../constants/modals';
import PayHistory from '../../student/profile/PayHistory';
import Api from '../../../Api';
import { Button } from 'semantic-ui-react';

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
        isSubscribing:data.isSubscribing
      });
    });
  }
  


  render() {
    const { birthday, name, phoneNumber, grade,isSubscribing } = this.state;

    return (
      <Modal>
        {({ openModal }) => (
          <div className="totalBox"  style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div 
                style={{
                  
                  flexDirection: 'column',
                  padding: 10,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius: 10,
                  alignItems: 'center',
                  minWidth:250
                }}
              >
                <div style={{display:'flex',flexDirection:'row',marginBottom:10}}>
                <div style={{flexmargin:5, fontWeight:'bold',fontSize:20}}>{name}님 |</div><div> {isSubscribing ? ("스윗미 가족"):
                ("스윗미 방문자")}</div></div>

                <div style={{textAlign:'center',borderRadius:5, backgroundColor:'rgb(247, 207, 192)'}}>내 정보</div>
                <div style={{margin:5}}>생년월일 : {birthday}</div>
                <div style={{margin:5}}>학년 : {grade}</div>
                <div style={{margin:5}}>휴대폰번호 : {phoneNumber}</div>

                <Button style={{marginTop : 10}}onPress={() => openModal(S_PROFILE_EDIT_MODAL, { type: 'edit' })}>
                  나의 프로필 수정/저장
                </Button>
                <Button style={{marginTop : 5}}>{isSubscribing ? ("월정액 회원 해지"):
                ("월정액 회원 신청")}</Button>
                
              </div>
            </div>

            <div className="payHistory"
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
                  <Button >조회</Button>
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
