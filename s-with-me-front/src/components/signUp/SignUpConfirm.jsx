import React, { PureComponent } from 'react';
import Button from '../../common-ui/Button';

export default class SignUpConfirm extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    console.log('called');
  }
  handlePress() {
    const { user, setUser } = this.props;
    setUser(user);
  }
  render() {
    return <Button onPress={() => this.handlePress}>확인</Button>;
  }
}
