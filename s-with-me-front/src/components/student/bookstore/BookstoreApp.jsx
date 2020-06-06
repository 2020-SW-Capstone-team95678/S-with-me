import React, { PureComponent } from 'react';

import { bootPayRequest } from './BootPay';
import Button from '../../../common-ui/Button';

export default class BookstoreApp extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ hight: 5, padding: 3 }}>서점</div>
        <div style={{ flex: 1, padding: 3 }}>
          Hello <Button onPress={() => bootPayRequest()}>결제</Button>
        </div>
      </div>
    );
  }
}
