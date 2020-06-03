import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Text from '../../../common-ui/Text';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import { Link } from 'react-router-dom';
import Api from '../../../Api';
import { CREATE_CURRICULUM } from '../../../constants/modals';
import ChapterListContainer from '../../../containers/student/book/ChapterListContainer';

export default class BookDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      isCoverClicked: false,
      curriculum: {},
      achievement: -1,
      myBook: {},
    };
  }

  componentDidMount() {
    const { myBookId } = this.props.match.params;
    Api.get('/student/library/my-book/getMyBook', {
      params: { myBookId: myBookId },
    }).then(({ data }) => {
      this.setState({ myBook: data });
      Api.get('/student/library/my-book', {
        params: { bookId: data.bookId },
      }).then(({ data }) => this.setState({ book: data }));
    });
    Api.get('/student/library/curriculum', {
      params: { myBookId: myBookId },
    }).then(({ data }) => this.setState({ curriculum: data }));
    Api.get('/student/library/curriculum/achievement', {
      params: { myBookId: myBookId },
    }).then(({ data }) => this.setState({ achievement: data }));
  }

  componentDidUpdate() {
    const { myBookId } = this.props.match.params;
    Api.get('/student/library/curriculum', {
      params: { myBookId: myBookId },
    }).then(({ data }) => this.setState({ curriculum: data }));
  }

  render() {
    const { book, myBook, isCoverClicked, curriculum, achievement } = this.state;
    const { myBookId } = this.props.match.params;
    const { lastPageNumber, lastSubChapterId } = myBook;
    const { grade, subject, name, cover, introduction } = book;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1.5, flexDirection: 'row', padding: 3 }}>
          {isCoverClicked ? (
            <div
              onClick={() => this.setState({ isCoverClicked: false })}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                border: '1px solid',
              }}
            >
              {grade}학년 / 과목 : {subject} <br /> <br />
              이름: {name} <br />
              <br />
              소개: {introduction}
            </div>
          ) : (
            <div
              onClick={() => this.setState({ isCoverClicked: true })}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                border: '1px solid',
                borderRadius: 2,
              }}
            >
              <img src={cover} alt="책 커버" style={{ height: 'auto', width: '100%' }} />
            </div>
          )}
          <Modal>
            {({ openModal }) => (
              <div style={{ flex: 1, flexDirection: 'column', padding: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                  {curriculum.type ? (
                    <Button
                      small
                      onPress={() =>
                        openModal(CREATE_CURRICULUM, {
                          myBookId: myBookId,
                          type: 'old',
                          curriculum: curriculum,
                        })
                      }
                    >
                      수정하기
                    </Button>
                  ) : (
                    <Button
                      small
                      onPress={() =>
                        openModal(CREATE_CURRICULUM, { myBookId: myBookId, type: 'new' })
                      }
                    >
                      새로운 목표 설정하기
                    </Button>
                  )}
                </div>
                <Card>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                    <Text large>이 책의 목표</Text>
                    <Text small>목표 type: {curriculum.type}</Text>
                    <Text>
                      {curriculum.type === 'monthly' ? curriculum.monthlyGoal : null}
                      {curriculum.type === 'weekly' ? (
                        <Link
                          to={`/library/myBook/${myBookId}/solve/${curriculum.subChapterId}?page=1`}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          이번주 목표 소단원 풀러 가기
                        </Link>
                      ) : null}
                      {curriculum.type === 'daily'
                        ? '하루에 ' + curriculum.dailyGoal + '문제 풀기'
                        : null}
                    </Text>
                  </div>
                </Card>
                {curriculum.type === 'temp' ? (
                  <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                      <Text large>달성도</Text>
                      <Text>{achievement}% 달성</Text>
                    </div>
                  </Card>
                ) : null}
              </div>
            )}
          </Modal>
        </div>
        <div style={{ flex: 5, flexDirection: 'row', paddingLeft: 30 }}>
          <Text>소단원 목차를 클릭하면 해당 문제풀이 페이지로 이동합니다.</Text>
          <ChapterListContainer myBookId={myBookId} />
        </div>
        <div style={{ flex: 1 }}>
          <Link to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}>
            <Button>이어 풀기</Button>
          </Link>
        </div>
      </div>
    );
  }
}
