import React, { useState, useEffect } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import Api from '../../../Api';



import 'react-accessible-accordion/dist/fancy-example.css';


const eachBookSold = () => {
  const [books, setBooks] = useState([]);
  const publisherId = window.sessionStorage.getItem('publisherId');
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/publisher/library/book', {
        params: {
          publisherId: publisherId,
        },
      });

      setBooks(data.data);
    };

    fetchData();
  }, []);


  return (
    <OverflowScrolling style={{ maxHeight: '90%' }} className="overflow-scrolling">
      <div style={{ display: 'flex' }}>
        <div style={{flex: 1, padding: 3, justifyItems: 'center', textAlign: 'center' }}>
          <div>
            <ol >
              {books.map(book => {
                return <BookInfo book={book}/>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </OverflowScrolling>
  );
};

const BookInfo = ({ book, onClick }) => {
  const [myBook, setMyBook] = useState([]);
  const bookId = book.bookId;
  const monthlySold=book.monthlySold;

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/publisher/library/book/${book.bookId}`, {
        params: {
          bookId,
        },
      });
      setMyBook(data.data);
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
        
      >
        <div style={{ display: 'flex', marginRight: 20 }}>
          <img width={200} src={myBook.cover} alt="bookCover" />
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
          <p>문제집 이름 : {myBook.name}</p>
          <p>가격 : {myBook.price}원</p>
          <p>판매 부수 : {monthlySold}권</p>

        </div>
      </div>
    </div>
    </div>
  );
};



export default eachBookSold;
