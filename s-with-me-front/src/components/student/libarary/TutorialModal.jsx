import React, { Component } from 'react';
import { Button, Icon, Modal, Image, Segment } from 'semantic-ui-react';
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
    const messages = [
      '구입한 책 목록을 한눈에 확인하고 바로 문제를 이어 풀 수 있습니다.',
      '문제집을 폴더별로 정리하거나 과목별, 최신순, 가나다순 보기 기능을 지원합니다.',
      '문제집별로 목표를 설정할 수 있습니다. 해당 목표를 클릭하면 문제 풀이 페이지로 이동됩니다.',
      '목차를 클릭하여 문제를 풀거나 사이드 바를 열어 문제집 정보와 달성도를 확인할 수 있습니다. ',
      '텍스트, 사진첨부, 손글씨 풀이 등 다양한 방식으로 풀이를 입력할 수 있고, 수식 입력 또한 지원합니다.',
      '채점 결과를 한 눈에 확인하고, 헷갈렸어요 체크 기능을 제공합니다. 원한다면 해설도 페이지를 이동하지 않고 확인할 수 있습니다.',
      '모바일 전용으로 오답노트를 이동 시나 자투리 시간에 효율적으로 학습할 수 있도록 슬라이더 형태의 보기 방식을 지원합니다.',
      '스윗미를 통해서 e문제집을 판매하거나 구입할 수 있습니다. 구매한 문제집은 바로 서재에서 확인 가능합니다.',
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
        size="large"
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
              <Segment>
                <Heading level={4}>자기주도 학습을 위한 e문제집 플랫폼 SwithMe</Heading>
              </Segment>
            </div>
            <Modal.Description>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Segment size="large" color="orange">
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
                </Segment>
              </div>
              <div style={{ paddingBottom: 10 }} />
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
                    <div
                      style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                    >
                      <Image centered size="medium" src={tutorial} wrapped />
                      <Segment attached="bottom">{messages[i]}</Segment>
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
