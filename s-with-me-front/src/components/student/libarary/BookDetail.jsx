import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Text from '../../../common-ui/Text';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import ChapterList from './ChapterList';

import { Link } from 'react-router-dom';
import Api from '../../../Api';
import { CREATE_CURRICULUM } from '../../../constants/modals';

export default class BookDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      name: '',
      grade: -1,
      cover: null,
      isCoverClicked: false,
      curriculum: {},
      achievement: -1,
    };
  }

  componentDidMount() {
    const { requestChapterList, myBook } = this.props;
    requestChapterList({ bookId: myBook.bookId });
    Api.get('/student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) =>
      this.setState({
        subject: data.subject,
        name: data.name,
        grade: data.grade,
        cover: data.cover,
      }),
    );
    Api.get('/student/library/curriculum', {
      params: { myBookId: myBook.myBookId },
    }).then(({ data }) => this.setState({ curriculum: data }));
    Api.get('/student/library/curriculum/achievement', {
      params: { myBookId: myBook.myBookId },
    }).then(({ data }) => this.setState({ achievement: data }));
  }

  render() {
    const { chapterList, myBook } = this.props;
    const { myBookId } = this.props.match.params;
    const { lastPageNumber, lastSubChapterId } = myBook;
    const { subject, name, grade, cover, isCoverClicked, curriculum, achievement } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2, flexDirection: 'row', padding: 3 }}>
          {isCoverClicked ? (
            <div
              onClick={() => this.setState({ isCoverClicked: false })}
              style={{
                height: 100,
                flexDirection: 'column',
                padding: 3,
                border: '1px red solid',
              }}
            >
              {grade}학년 / 과목 : {subject} <br />
              이름: {name}
            </div>
          ) : (
            <div
              onClick={() => this.setState({ isCoverClicked: true })}
              style={{
                height: 100,
                flexDirection: 'column',
                padding: 3,
                border: '1px red solid',
              }}
            >
              {cover}
            </div>
          )}
          <Modal>
            {({ openModal }) => (
              <div style={{ flex: 1, flexDirection: 'column', padding: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                  <Button
                    small
                    onPress={() =>
                      openModal(CREATE_CURRICULUM, { myBookId: myBookId, type: 'new' })
                    }
                  >
                    새로운 목표 설정하기
                  </Button>
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
                {curriculum.type !== 'monthly' ? (
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
          <ChapterList myBookId={myBookId} chapterList={chapterList} />
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
