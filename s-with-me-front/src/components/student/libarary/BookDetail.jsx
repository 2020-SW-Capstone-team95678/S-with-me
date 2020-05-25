import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import Card from '../../../common-ui/Card';
import Heading from '../../../common-ui/Heading';
import Button from '../../../common-ui/Button';
import ChapterList from './ChapterList';
import { Link } from 'react-router-dom';

class BookDetail extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };

  componentDidMount() {
    const { requestChapterList, myBook } = this.props;
    requestChapterList({ bookId: myBook.bookId });
  }

  render() {
    const { styles, chapterList, myBook } = this.props;
    const { myBookId } = this.props.match.params;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div
                style={{
                  height: 100,
                  flexDirection: 'column',
                  padding: 3,
                  border: '1px red solid',
                }}
              ></div>
              <div style={{ flex: 1, flexDirection: 'column', padding: 3 }}>
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
            </div>
            <div style={{ flex: 4, flexDirection: 'row', padding: 3 }}>
<<<<<<< HEAD
              {/* <Link to={`/library/myBook/${myBookId}/solve/${lastPageNumber}`}> */}
              <Button xsmall>이어 풀기</Button>
              {/* </Link> */}
=======
              <Link to={`/library/myBook/${myBookId}/solve/${myBook.lastProblemId}`}>
                <Button xsmall>이어 풀기</Button>
              </Link>
>>>>>>> af9d56ac883933fb6cac0313e9bb1be9edc8c061
              <ChapterList chapterList={chapterList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(BookDetail);
