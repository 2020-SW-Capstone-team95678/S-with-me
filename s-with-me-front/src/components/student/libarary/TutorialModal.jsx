import React, { Component } from 'react';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';
import Heading from '../../../common-ui/Heading';
import BookPayInputContainer from '../../../containers/bookstore/BookPayInputContainer';

class NestedModal extends Component {
  state = { open: false, showInputForm: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open, showInputForm } = this.state;
    const item = {
      price: 5900,
      name: 'SwithMe 월정액 멤버십',
    };
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button primary icon basic>
            튜토리얼 보러가기 <Icon name="right chevron" />
          </Button>
        }
      >
        {/* <Image wrapped size="medium" src="/images/wireframe/image.png" /> */}
        {showInputForm ? (
          <Modal.Content>
            <BookPayInputContainer
              book={item}
              bookId="9859a212-c2db-972e-1b27-d68a3fce33f1"
              close={this.close}
            />
          </Modal.Content>
        ) : (
          <Modal.Content>
            <p>여기에 설명 ~~</p>
          </Modal.Content>
        )}
        <Modal.Actions>
          <Button
            icon="won"
            content={showInputForm ? '튜토리얼 다시 보기' : '멤버십 가입하기'}
            basic
            color="green"
            onClick={() =>
              this.setState(prevState => ({ showInputForm: !prevState.showInputForm }))
            }
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const TutorialModal = props => (
  <Modal open={props.show}>
    <Modal.Content image>
      <Modal.Description>
        <Heading level={4}>스윗미에 오신 것을 환영합니다!</Heading>
        <p>서비스를 이용하기 위해서 멤버십에 가입해주세요.</p>
        <p>
          월 이용료는 <b>5,900원</b> 입니다.
        </p>
      </Modal.Description>
      <div className="image">
        <Icon name="handshake outline" />
      </div>
    </Modal.Content>
    <Modal.Actions>
      <NestedModal />
    </Modal.Actions>
  </Modal>
);

export default TutorialModal;
