import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';

import 'react-accessible-accordion/dist/fancy-example.css';

const BookInfoPage = props => {
  const [bookId, setBookId] = useState(null);

  const [grade, setGrade] = useState(1);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState(0);
  const [introduction, setIntroduction] = useState('');

  return (
    <Modal>
      {({ closeModal }) => (
        <div>
          <div>
            Book infos
            <br />
            <br />
            <h2>book Id : {bookId}</h2>
            Grade
            <input
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
            <input
              type="text"
              value={subject}
              placeholder="please input subject"
              onChange={({ target: { value } }) => setSubject(value)}
            />
            Introduction
            <input
              type="text"
              value={introduction}
              placeholder="please input introduction"
              onChange={({ target: { value } }) => setIntroduction(value)}
            ></input>
            Price
            <input
              type="number"
              value={price}
              placeholder="please input price"
              onChange={({ target: { value } }) => setPrice(value)}
            ></input>
            <button
              onClick={() => {
                Api.post('/publisher/library/book', {
                  cover: null,
                  grade: grade,
                  name: name,
                  price: price,
                  publisherId: 1,
                  subject: subject,
                  introduction: introduction,
                }).then(response => {
                  setBookId(response.data);
                });
              }}
            >
              등록
            </button>
            <button
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookInfoPage;
