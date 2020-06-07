import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

export default class AutoContainModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button onClick={this.show(true)}>결제하기</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.props.cover} />
            <Modal.Description>
              <Header>
                스윗미에서 무료로 제공하는 기본 문제집입니다. 내 서재에 담으시겠습니까?
              </Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              취소
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="내 서재 담기"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
