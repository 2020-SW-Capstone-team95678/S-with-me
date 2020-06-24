import React, { useState } from 'react';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';

import 'react-accessible-accordion/dist/fancy-example.css';
import InputBookCover from '../library/InputBookCover';
import { Button } from 'semantic-ui-react';


const CreateBookPage = props => {
  //const onUpDate  = props;

  const [grade, setGrade] = useState(1);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState(0);
  const [cover, setCover] = useState([]);
  //const isOnSale=false;
  const [introduction, setIntroduction] = useState('');
  const { publisherId, doneCallback } = props;

  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }

  return (
    <Modal>
      {({ closeModal }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            Book infos
            <br />
         
            북커버
            <InputBookCover setCover={setCover} />
            Grade
            <input
              style={{ flex: 1 }}
              type="number"
              value={grade}
              placeholder="please input grade"
              onChange={({ target: { value } }) => setGrade(value)}
            />
            Name
            <input
              type="text"
              value={name}
              placeholder="please input name"
              onChange={({ target: { value } }) => setName(value)}
            />
            Subject
            <select defaultValue={'국어'} onChange={handleSubjectChange}>
              <option selected value="국어">
                국어
              </option>
              <option value="수학">수학</option>
              <option value="사회">사회</option>
              <option value="과학">과학</option>
              <option value="영어">영어</option>
              <option value="한국사">한국사</option>
              <option value="기타">기타</option>
            </select>
            {/* <input
              type="text"
              value={subject}
              placeholder="please input subject"
              onChange={({ target: { value } }) => setSubject(value)}
            /> */}
            Introduction
            <textarea
              type="text"
              style={{minHeight:'300px'}}
              value={introduction}
              placeholder="please input introduction"
              onChange={({ target: { value } }) => setIntroduction(value)}
            ></textarea>
            Price
            <input
              type="number"
              value={price}
              placeholder="please input price"
              onChange={({ target: { value } }) => setPrice(value)}
            ></input>
            <br></br>
            <br></br>
            <Button
              onClick={() => {
                Api.post('/publisher/library/book', {
                  cover: cover,
                  grade: grade,
                  name: name,
                  price: price,
                  publisherId: publisherId,
                  subject: subject,
                  introduction: introduction,
                  isOnSale:false
                }).then(response => {
                  
                  doneCallback({
                    bookId: response.data,
                    cover: cover,
                    grade: grade,
                    name: name,
                    price: price,
                    publisherId: publisherId,
                    subject: subject,
                    introduction: introduction,
                    isOnSale:false
                  });
                  closeModal();
                });
              }}
            >
              등록
            </Button>
            <Button
              style={{marginTop:5}}
              onClick={() => {
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

export default CreateBookPage;
