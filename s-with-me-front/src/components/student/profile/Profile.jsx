import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { S_PROFILE_EDIT_MODAL } from '../../../constants/modals';

import Api from '../../../Api';
import AppNav, { HEIGHT } from '../AppNav';
import Button from '../../../common-ui/Button';

import './Profile.css';
import { requestMyProfile } from '../../../actions/myProfileAction';

class StudentProfile extends PureComponent {

  static propTypes = {
    ...withStylesPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: -1,
      birthday: '',
      phoneNumber:'',
    };
  }

  componentDidMount() {
    const { requestMyProfile } = this.props;
    const studentId = window.sessionStorage.getItem('studentId');
    Api.get('student/profile', {params: { studentId },
    }).then(({ data }) =>{
      this.setState({
        name: data.name,
        birthday: data.birthday,
        grade: data.grade,
        phoneNumber:data.phoneNumber,
      });
    });
  }

  render() {
    const { birthday, name, phoneNumber, grade } = this.state;
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <Modal>
            {({ openModal }) => (
              <div style={{ display: 'flex', justifyContent: 'center' }} {...css(styles.container)}>
                <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
                  <div
                    style={{
                      height: 400,
                      width: 300,
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
                    flex: 3,
                    height: 400,
                    width: 500,
                    flexDirection: 'column',
                    padding: 3,
                    border: '2px rgb(247, 207, 192) solid',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}
                >
                  <Form.Consumer>
                    {({ onChange, values }) => (
                      <InlineList spacingBetween={1}>
                        <Select name="PayFilter" onChange={onChange}>
                          <Option label="조회 기간 설정" />
                          <Option label="최근 30일" value="onemonth" />
                          <Option label="최근 6개월" value="sixmonth" />
                        </Select>
                        <Button>조회</Button>
                      </InlineList>
                    )}
                  </Form.Consumer>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(StudentProfile);

