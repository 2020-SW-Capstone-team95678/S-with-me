import React from 'react';
import { bootPayRequest } from './BootPay';
import { Button, Form as SemanticForm } from 'semantic-ui-react';
import Form from '../../../common-ui/Form';
import Heading from '../../../common-ui/Heading';

function generateOrderId() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default function BookPayInput(props) {
  const studentId = window.sessionStorage.getItem('studentId');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Heading level={3}>결제 정보 입력하기</Heading>
      <Form
        onSubmit={values => {
          if (props.book.price !== 0) {
            let form = {
              book: props.book,
              user: values,
              bookId: props.bookId,
              orderId: generateOrderId(),
              buyMyBook: props.buyMyBook,
              studentId: studentId,
            };
            bootPayRequest(form);
          }
        }}
      >
        <Form.Consumer>
          {({ onChange }) => (
            <SemanticForm>
              <SemanticForm.Field>
                <label>이름</label>
                <input placeholder="name" onChange={onChange} name="name" />
              </SemanticForm.Field>
              <SemanticForm.Field>
                <label>전화번호</label>
                <input placeholder="010-0000-0000" name="phone" />
              </SemanticForm.Field>
              <SemanticForm.Field>
                <label>e-mail</label>
                <input placeholder="swithme@sth.com" name="email" />
              </SemanticForm.Field>
              <Button type="submit">결제하기</Button>
            </SemanticForm>
          )}
        </Form.Consumer>
      </Form>
    </div>
  );
}
