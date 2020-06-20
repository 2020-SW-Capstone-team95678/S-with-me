import React, { useState, useEffect } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import Api from '../../../Api';
import './PayHistory.css';

import 'react-accessible-accordion/dist/fancy-example.css';

const PayHistory = () => {
  const [myBooks, setMyBooks] = useState([]);
  const studentId = window.sessionStorage.getItem('studentId');
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/student/library', {
        params: {
          studentId: studentId,
        },
      });
      setMyBooks(data.data);
    };

    fetchData();
  }, []);

  return (
    <OverflowScrolling style={{ maxHeight: '90%' }} className="overflow-scrolling">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: 3, justifyItems: 'center', textAlign: 'center' }}>
          <div>
            <ol>
              {myBooks.map(myBook => {
                return <BookInfo myBook={myBook} />;
              })}
            </ol>
          </div>
        </div>
      </div>
    </OverflowScrolling>
  );
};

const BookInfo = ({ myBook, onClick }) => {
  const [book, setBook] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [clicked, setClicked] = useState(false);
  const bookId = myBook.bookId;
  const receiptId = myBook.receiptId;

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/student/library/my-book`, {
        params: {
          bookId,
        },
      });
      setBook(data.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: 'rgb(255, 245, 238)',
          borderRadius: 5,
          padding: 5,
          minHeight: 150,
          marginTop: 10,
          marginBottom: 10,
          marginRight: 40,
          justifyItems: 'center',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            borderRadius: 5,
            padding: 8,
            minHeight: '100%',
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
          }}
          onClick={() => {
            setClicked(!clicked);
            setSelectedBook(book);
          }}
        >
          <div style={{ display: 'flex', marginRight: 20 }}>
            <img width={100} src={book.cover} alt="bookCover" />
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              textAlign: 'center',
              marginTop: 3,
              padding: 2,
              width: '100%',
              flex: 1,
            }}
          >
            <p>문제집 이름 : {book.name}</p>
            <p>가격 : {book.price}원</p>
          </div>
        </div>
        <div style={{ flex: 4, padding: 3 }}>
          {(() => {
            if (selectedBook && clicked) {
              return <PayDetail book={selectedBook} receiptId={receiptId} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export const PayDetail = ({ book, receiptId }) => {
  const [payDetail, setPayDetail] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/student/profile/payhistory`, {
        params: {
          receiptId,
        },
      });
      setPayDetail(data.data.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'row', border: '2px rgb(255, 245, 238) solid' }}
      >
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div>
            <p>문제집 이름 : {book.name}</p>
            <p>가격 : {book.price}</p>
            <p>결제 금액 : {payDetail.price}</p>
            <p>결제 수단 : {payDetail.method_name}</p>
            <p>결제 시간 : {payDetail.purchased_at}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayHistory;
