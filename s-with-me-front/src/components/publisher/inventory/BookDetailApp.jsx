import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Accordion, Button, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Text from '../../../common-ui/Text';
import Api from '../../../Api';
import BookInfo from './BookInfo';

class BookDetailApp extends PureComponent {
  constructor(props) {
    super();
    this.state = { book: undefined };
  }
  componentDidMount() {
    const { book } = this.props.location.state;
    this.props.requestChapterList({ bookId: book.bookId }, true);
  }

  render() {
    const { chapterList, styles } = this.props;
    const { book } = this.props.location.state;
    const { name } = this.props.match.params;
    const rootPanels = chapterList.map(({ mainChapter, subChapters }) => {
      const key = mainChapter.mainChapterId;
      const mainTitle = mainChapter.mainChapterName;

      const subChapterPanels = subChapters.map((subChapter) => {
        const key = subChapter.subChapterId;
        const subTitle = subChapter.subChapterName;

        const buttons = (
          <div>
            <Button basic color="brown" icon="edit" content="이름 수정" />
            <Button basic negative icon="remove" content="소단원 삭제" />
            <Link
              to={{
                pathname: `/inventory/${name}/${mainTitle}/${subTitle}/problems`,
                state: {
                  book: book,
                  subChapterId: key,
                },
              }}
            >
              <Button icon="right arrow" labelPosition="right" basic color="orange" content="Go!" />
            </Link>
          </div>
        );

        return { key, title: subTitle, content: { content: buttons } };
      });

      const subChapterContent = (
        <div>
          <Button basic color="brown" icon="edit" content="이름 수정" />
          <Button
            basic
            floated="right"
            labelPosition="right"
            positive
            icon="add"
            content="소단원 추가"
          />
          <Button basic negative icon="remove" content="대단원 삭제" />
          <Accordion.Accordion panels={subChapterPanels} />
        </div>
      );

      return { key, title: mainTitle, content: { content: subChapterContent } };
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }} {...css(styles.table)}>
          <Segment color="blue">문제집 정보</Segment>
          <Button
            attached="bottom"
            icon="barcode"
            size="medium"
            content={book.isOnSale ? '판매 중' : '판매 시작'}
            // onClick={() => this.setState({ isAdding: !isAdding })}
          />
          <BookInfo book={book} />
          Monthly 수익 등등 보기
        </div>

        <div style={{ flex: 4 }} {...css(styles.table)}>
          <Segment color="blue">
            <Text large>{name}</Text>
            <Text> / Table Of Contents</Text>
          </Segment>
          <Button
            basic
            floated="right"
            labelPosition="right"
            positive
            icon="add"
            content="대단원 추가"
          />
          <Accordion defaultActiveIndex={0} panels={rootPanels} styled fluid />
        </div>
      </div>
    );
  }
}

export default withStyles(() => ({
  table: {
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(BookDetailApp);
