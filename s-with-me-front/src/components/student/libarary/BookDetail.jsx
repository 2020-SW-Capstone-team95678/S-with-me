import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import AppNav, { HEIGHT } from '../AppNav';
import Card from '../../../common-ui/Card';
import Heading from '../../../common-ui/Heading';
import Button from '../../../common-ui/Button';
import Api from '../../../Api';
import ChapterList from './ChapterList';
import { Link } from 'react-router-dom';

class BookDetail extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      chapterList: [],
      lastPageNumber: -1,
    };
  }

  componentDidMount() {
    const { myBookId } = this.props.match.params;
    const { myBookList } = this.props;
    for (let myBook of myBookList) {
      if (myBook.myBookId === myBookId * 1) {
        this.setState({ lastPageNumber: myBook.lastPageNumber });
      }
    }
    Api.get(`/student/library/my-book/${myBookId}`).then(response => {
      this.setState({
        chapterList: response.data.chapterList,
      });
    });
  }

  render() {
    const { styles } = this.props;
    const { chapterList, lastPageNumber } = this.state;
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
              <Link to={`/library/myBook/${myBookId}/solve/${lastPageNumber}`}>
                <Button xsmall>이어 풀기</Button>
              </Link>
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
