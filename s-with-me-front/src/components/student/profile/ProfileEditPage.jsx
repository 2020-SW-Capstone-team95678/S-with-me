import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import Input from '../../../common-ui/Input';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import { Button } from 'semantic-ui-react';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';

export const ProfileEditPage = props => {
    const { prevPhone,prevGrade,doneCallback,studentId,profile } = props;
    const [phoneNumber, setPhoneNumber] = useState(prevPhone);
    const [grade, setGrade] = useState(prevGrade);
  
    console.log(studentId);
    return (
      <Modal>
        {({ closeModal }) => (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

                  휴대폰번호
                  <input style={{marginLeft:10}}
                type="text"
                value={phoneNumber}
                onChange={({ target: { value } }) => setPhoneNumber(value)}
                onBlur={e => {
                  if (e.target.value !== prevPhone) {
                    Api.put(`/student/profile?studentId=${studentId}`,{phoneNumber,grade})
                  }
                }}
              ></input>
               학년
                  <input style={{marginLeft:10}}
                type="text"
                value={grade}
                onChange={({ target: { value } }) => setGrade(value)}
                onBlur={e => {
                  if (e.target.value !== prevGrade) {
                    Api.put(`/student/profile?studentId=${studentId}`,{phoneNumber,grade})
                  }
                }}
              ></input>
              <br />
              <br />
  
              <Button
              onClick={() => {
                profile.grade=grade;
                profile.phoneNumber=phoneNumber;
                doneCallback({
                  profile,
                  
                });
                closeModal();
              }}
            >
              닫기
            </Button>
            </div>
          </div>
        )}
      </Modal>
    );
    
};

export default ProfileEditPage;



// class ProfileEditPage extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(values, closeModal) {
//     const { name, code } = this.props;
//     const formValues = {
//       ...values,
//       code,
//       name,
//     };
//     Api.post('/profile', formValues).then(() => closeModal());
//   }
//   render() {
//     const { price, type } = this.props;
//     const typeName = type === 'edit' ? '수정' : '예비'; //profile은 수정만 존재
//     return (
//       <Modal>
//         {({ closeModal }) => (
//           <Form
//             onSubmit={values => this.handleSubmit(values, closeModal)}
//             initValues={{ currentPrice: price }}
//           >
//             <Form.Consumer>
//               {({ onChange, values }) => (
//                 <Spacing horizontal={4} vertical={8}>
//                   <Text xlarge bold>
//                     프로필 수정
//                   </Text>
//                   <Spacing bottom={2}>
//                     휴대폰번호
//                   <input
//               type="text"
//               value={name}
//               onKeyDown={handleEnter}
//               onChange={onChangeName}
//               onBlur={e => {
//                 if (e.target.value !== book.name) {
//                   book.name = name;

//                   Api.put(`/publisher/library/book/${book.bookId}`, book)
//                     .then(response =>
//                       setBooks(prev => {
//                         return [...prev];
//                       }),
//                     )
//                     .catch(reason => setName(book.name));
//                 }
//               }}
//             ></input>
//                     <Input
//                       name="password"
//                       label="비밀번호"
//                       value={values['amount']}
//                       onChange={onChange}
//                     />
//                     <InlineList spacingBetween={1}>
//                       <Text>학년</Text>
//                       <Form.Consumer name="grade" label="학년" value={values['amount']}>
//                         {({ onChange, values }) => (
//                           <InlineList spacingBetween={1}>
//                             <Select name="PayFilter" onChange={onChange}>
//                               <Option label="선택" />
//                               <Option label="1학년" value="grade1" />
//                               <Option label="2학년" value="grade2" />
//                               <Option label="3학년" value="grade3" />
//                             </Select>
//                           </InlineList>
//                         )}
//                       </Form.Consumer>
//                     </InlineList>
//                   </Spacing>
//                   <InlineList spacingBetween={1}>
//                     <Button primary>{typeName}</Button>
//                     <Button onPress={closeModal}>취소</Button>
//                   </InlineList>
//                 </Spacing>
//               )}
//             </Form.Consumer>
//           </Form>
//         )}
//       </Modal>
//     );
//   }
// }

// ProfileEditPage.propTypes = {
//   createTransaction: PropTypes.func,
// };

// export default ProfileEditPage;
