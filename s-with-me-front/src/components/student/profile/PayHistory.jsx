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
        <div style={{flex: 1, padding: 3, justifyItems: 'center', textAlign: 'center' }}>
          <div>
            <ol >
              {myBooks.map(myBook => {
                return <BookInfo myBook={myBook}/>;
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
  const [clicked,setClicked]=useState(false);
  const bookId = myBook.bookId;
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/student/library/my-book`, {
        params: {
          bookId,
        },
      });
      setBook(data.data);
      console.log('here');
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
        onClick={()=>{setClicked(!clicked); setSelectedBook(book)}}
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
          if (selectedBook&&clicked) {
            return <PayDetail book={selectedBook}  />;
          }
        })()}
      </div>
    </div>
    </div>
  );
};

export const PayDetail = ({  book, setBooks }) => {
    const dumpdata={
        action: "BootpayDone",
amount: 2000,
card_code: "97",
card_name: null,
card_no: "*********",
card_quota: null,
item_name: "수학문제집",
method: "kakao",
method_name: "카카오페이",
order_id: "8dc9d433-8d46-b5f7-afc8-46a69e95091c",
params: null,
parent: 2,
payment_group: "card",
payment_group_name: "신용카드",
payment_name: "카카오페이",
pg: "inicis",
pg_name: "이니시스",
price: 2000,
purchased_at: "2020-06-10 01:05:02",
receipt_id: "5edfb31618e1ae0025c3bbef",
receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20200610010501896424&noMethod=1",
requested_at: "2020-06-10 01:04:38",
status: 1,
tax_free: 0,
url: "http://localhost:3000"
    }
  const [name, setName] = useState(book.name);
  const [cover, setCover] = useState(book.cover);
  const [isOnSale, setIsOnSale] = useState(book.isOnSale);
  const [price, setPrice] = useState(book.price);

  //부트 페이 내역 가져오기 되면 사용될 아이들이라 안지웠습니다.

  console.log(book.bookId);
  console.log(book);

  useEffect(() => {
    setName(book.name ? book.name : '');
    setPrice(book.price ? book.price : 0);
    // setName(book.introduction ? book.introduction : '');
    // setPrice(book.grade ? book.grade : 0);
    setCover(
      book.cover
        ? book.cover
        : 'https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg',
    );
  }, [book]);

  console.log(dumpdata);


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row',border: '2px rgb(255, 245, 238) solid' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div>
            <p>문제집 이름 : {book.name}</p>
            <p>가격 : {book.price}</p>
            <p>결제 금액 : {dumpdata.amount}</p>
            <p>결제 수단 : {dumpdata.payment_name}</p>
            <p>결제 시간 : {dumpdata.purchased_at}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayHistory;
