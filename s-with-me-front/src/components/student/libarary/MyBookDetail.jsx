import React, { PureComponent } from 'react';
import { Progress, Card, Image, Label, Button } from 'semantic-ui-react';

import Text from '../../../common-ui/Text';
import Heading from '../../../common-ui/Heading';

import { Link } from 'react-router-dom';

import Api from '../../../Api';
import ChapterListContainer from '../../../containers/student/book/ChapterListContainer';
import CreateCurriculumPageContainer from '../../../containers/student/book/CreateCurriculumPageContainer';

class MyBookDetail extends PureComponent {
  _isMounted = false;
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
    this._isMounted = true;
    const { myBookId } = this.props.match.params;
    Api.get('/student/library/my-book/getMyBook', {
      params: { myBookId: myBookId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ myBook: data });
      Api.get('/student/library/my-book', {
        params: { bookId: data.bookId },
      }).then(({ data }) => {
        if (this._isMounted) this.setState({ book: data });
      });
    });
    Api.get('/student/library/curriculum', {
      params: { myBookId: myBookId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ curriculum: data });
    });
    Api.get('/student/library/curriculum/achievement', {
      params: { myBookId: myBookId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ achievement: data });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { book, myBook, curriculum, achievement } = this.state;
    const { myBookId } = this.props.match.params;
    const { lastPageNumber, lastSubChapterId } = myBook;
    const { grade, subject, name, cover, introduction } = book;
    let achievementColor = '';

    if (achievement <= 33) {
      achievementColor = 'red';
    } else if (achievement <= 66) {
      achievementColor = 'yellow';
    } else if (achievement <= 99) {
      achievementColor = 'blue';
    }
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Card centered>
            <Card.Content textAlign="center">
              <Image src={cover} size="medium" />
            </Card.Content>
            <Card.Content>
              <Card.Meta>
                <Text large>{name}</Text>
                <Label icon="graduation" content={grade + '학년'} />
                <Label icon="tags" content={subject} />
              </Card.Meta>
              <Card.Description>{introduction}</Card.Description>
            </Card.Content>
          </Card>
          <Card centered>
            <Card.Content textAlign="center">
              <Heading level={6}>이 책의 목표</Heading>
            </Card.Content>
            <Card.Content textAlign="center">
              {curriculum.type === 'monthly' ? curriculum.monthlyGoal : null}
              {curriculum.type === 'weekly' ? (
                <Link
                  to={`/library/myBook/${myBookId}/solve/${curriculum.subChapterId}?page=1`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  이번주 목표 소단원 풀러 가기
                </Link>
              ) : null}
              {curriculum.type === 'daily' ? '하루에 ' + curriculum.dailyGoal + '문제 풀기' : null}
              {curriculum.type ? null : '설정된 목표가 없습니다.'}
            </Card.Content>
            <Card.Content extra textAlign="center">
              {curriculum.type ? (
                <CreateCurriculumPageContainer
                  type="old"
                  curriculum={curriculum}
                  myBookId={myBookId}
                />
              ) : (
                <CreateCurriculumPageContainer
                  type="new"
                  curriculum={curriculum}
                  myBookId={myBookId}
                />
              )}
            </Card.Content>
          </Card>

          {curriculum.type !== 'monthly' ? (
            <Card centered>
              <Card.Content textAlign="center">
                <Heading level={6}>달성도</Heading>
              </Card.Content>
              <Card.Content>
                {achievement === 100 ? (
                  <Progress percent={100} color="green" success>
                    계획 수행 완료! 정말 멋져요!
                  </Progress>
                ) : (
                  <Progress percent={achievement} color={achievementColor} progress>
                    아자 아자 화이팅!
                  </Progress>
                )}
              </Card.Content>
            </Card>
          ) : null}
        </div>
        <div style={{ flex: 2 }}>
          <Link to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}>
            <Button floated="right" color="green" inverted content="이어 풀기" />
          </Link>
          <Text>소단원 목차를 클릭하면 해당 문제풀이 페이지로 이동합니다.</Text>
          <ChapterListContainer myBookId={myBookId} />
        </div>
      </div>
    );
  }
}

export default MyBookDetail;
