import React, { Component } from 'react';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';
import Heading from '../../../common-ui/Heading';
import BookPayInputContainer from '../../../containers/bookstore/BookPayInputContainer';

import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../problem/MobileProblemBar/MobileProblemBar.scss';

import tutorial1 from '../../../tutorial/tutorial(1).png';
import tutorial2 from '../../../tutorial/tutorial(2).png';
import tutorial3 from '../../../tutorial/tutorial(3).png';
import tutorial4 from '../../../tutorial/tutorial(4).png';
import tutorial5 from '../../../tutorial/tutorial(5).png';
import tutorial6 from '../../../tutorial/tutorial(6).png';
import tutorial7 from '../../../tutorial/tutorial(7).png';
import tutorial8 from '../../../tutorial/tutorial(8).png';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';

class NestedModal extends Component {
  state = { open: false, showInputForm: false };
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open, showInputForm } = this.state;
    const tutorials = [
      tutorial1,
      tutorial2,
      tutorial3,
      tutorial4,
      tutorial5,
      tutorial6,
      tutorial7,
      tutorial8,
    ];
    const item = {
      price: 5900,
      name: 'SwithMe 월정액 멤버십',
    };
    return (
      <Modal
        open={open}
        image
        scrolling
        onOpen={this.open}
        onClose={this.close}
        size="fullscreen"
        trigger={
          <Button primary icon basic>
            튜토리얼 보러가기 <Icon name="right chevron" />
          </Button>
        }
      >
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Heading level={6}>환영합니다!</Heading>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Heading level={4}>자기주도 학습을 위한 e문제집 플랫폼 SwithMe</Heading>
            </div>
            <Modal.Description>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                  학생들 여러분, 종이로 된 문제집으로 문제 풀이를 하다 보면 이면지에 중구난방으로
                  필기하여 복습할 때 어려움을 겪지는 않으셨나요? <br /> 스윗미는 수험생 여러분들에게
                  여러 문제집의 풀이를 한 곳에서 관리하고 중구난방이었던 오답노트를 효율적으로
                  관리할 수 있는 서비스를 제공합니다. <br />
                  <b>
                    월 정액에 가입하시면 양질의 평가원, 수능 기출문제를 무제한으로 풀어 볼 수
                    있습니다.
                  </b>
                  <br />
                  언제 어디서나 직접 문제를 보고 풀고 복습할 수 있는 e-문제집 플랫폼 스윗미를
                  소개합니다!
                </p>
              </div>
            </Modal.Description>
            <CarouselProvider
              isIntrinsicHeight
              totalSlides={8}
              naturalSlideWidth={10}
              visibleSlides={isMobile ? 2 : 4}
            >
              <Slider>
                {tutorials.map((tutorial, i) => (
                  <Slide index={i} key={i} innerClassName="innerSlide">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Image centered size="medium" src={tutorial} wrapped />
                    </div>
                  </Slide>
                ))}
              </Slider>
            </CarouselProvider>
          </Modal.Content>
        )}
        <Modal.Actions>
          <Button icon="redo" content="이전으로" basic color="red" onClick={() => this.close()} />
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

const TutorialModal = props => {
  const handleLogout = () => {
    window.sessionStorage.clear();
  };
  return (
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
        <NavLink to="/">
          <Button
            icon="logout"
            content="로그아웃하기"
            basic
            color="red"
            onClick={() => handleLogout('ggg')}
          />
        </NavLink>
        <NestedModal />
      </Modal.Actions>
    </Modal>
  );
};

export default TutorialModal;
