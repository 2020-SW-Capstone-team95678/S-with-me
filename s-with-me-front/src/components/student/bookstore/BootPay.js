import BootPay from 'bootpay-js';
import { BootPayApi } from '../../../Api';

let BootpayRest = require('bootpay-rest-client');
BootpayRest.setConfig('5edb7b5c8f0751002bfcd4bf', '/mKKFkSwJ/N7RJ5Hpb96YbvzVZA+VH+knKrGq4HD6zU=');

export const bootPayRequest = form => {
  const { book, user, bookId, orderId, buyMyBook, studentId } = form;
  BootPay.request({
    price: bookId === '9859a212-c2db-972e-1b27-d68a3fce33f1' ? 0 : book.price, //실제 결제되는 가격
    application_id: '5edb7b5c8f0751002bfcd4bc',
    name: book.name, //결제창에서 보여질 이름
    pg: bookId === '9859a212-c2db-972e-1b27-d68a3fce33f1' ? 'danal' : 'inicis',
    method: bookId === '9859a212-c2db-972e-1b27-d68a3fce33f1' ? 'card_rebill' : '', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
    show_agree_window: 1, // 부트페이 정보 동의 창 보이기 여부
    items: [
      {
        item_name: book.name, //상품명
        qty: 1, //수량
        unique: bookId, //해당 상품을 구분짓는 primary key
        price: book.price, //상품 단가
      },
    ],
    user_info: {
      username: user.name,
      email: user.email,
      phone: user.phone,
    },
    order_id: orderId, //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
    account_expire_at: '2018-05-25', // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
    extra: {
      vbank_result: 1, // 가상계좌 사용시 사용, 가상계좌 결과창을 볼지(1), 말지(0), 미설정시 봄(1)
      quota: '0,2,3', // 결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
    },
  })
    .error(function(data) {
      //결제 진행시 에러가 발생하면 수행됩니다.
      console.log(data);
    })
    .cancel(function(data) {
      //결제가 취소되면 수행됩니다.
      console.log(data);
    })
    .ready(function(data) {
      // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
      console.log(data);
    })
    .confirm(function(data) {
      //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
      //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
      console.log(data);
      var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
      if (enable) {
        BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
      } else {
        BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
      }
    })
    .close(function(data) {
      // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
      console.log(data);
    })
    .done(function(data) {
      //결제가 정상적으로 완료되면 수행됩니다
      //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
      if (bookId === '9859a212-c2db-972e-1b27-d68a3fce33f1') {
        console.log(data);
        BootpayRest.getAccessToken().then(function(token) {
          if (token.status === 200) {
            BootPayApi.post('/subscribe/billing', {
              billing_key: data.billing_key,
              item_name: book.name,
              price: book.price,
              order_id: new Date().getTime(),
              items: [
                {
                  item_name: book.name,
                  qty: 1,
                  unique: '9859a212-c2db-972e-1b27-d68a3fce33f1',
                  price: 5900,
                },
              ],
            }).then(function(response) {
              response.header('Access-Control-Allow-Origin', '*');
              if (response.status === 200) {
                let formValue = {
                  studentId: studentId * 1,
                  isSubscribing: true,
                };
                buyMyBook(formValue, () => {
                  window.sessionStorage.setItem('isSubscribing', true);
                  console.log('update membership complete');
                  form.close();
                });
              }
            });
          }
        });
      } else {
        let formValue = {
          bookId: bookId,
          receiptId: data.receipt_id,
          studentId: studentId,
        };
        buyMyBook(formValue, () => console.log('complete'));
      }
    });
};
