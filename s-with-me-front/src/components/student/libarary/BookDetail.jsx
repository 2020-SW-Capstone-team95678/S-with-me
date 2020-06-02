import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import Heading from '../../../common-ui/Heading';
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
    this.state = { subject: '', name: '', grade: -1, cover: null, isCoverClicked: false };
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
  }

  render() {
    const { chapterList, myBook } = this.props;
    const { myBookId } = this.props.match.params;
    const { lastPageNumber, lastSubChapterId, bookId } = myBook;
    const { subject, name, grade, cover, isCoverClicked } = this.state;
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
                <Button onPress={() => openModal(CREATE_CURRICULUM, { myBookId: myBookId })}>
                  새로운 목표 설정하기
                </Button>
                <Card>
                  <Heading level={3}>목표</Heading>
                  <Heading level={4}>월별 목표</Heading>
                  <Heading level={5}>Chapter1 풀기</Heading>
                </Card>
                <Card>
                  <Heading level={3}>달성도</Heading>
                  <Heading level={5}>70% 달성!!</Heading>
                </Card>
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
