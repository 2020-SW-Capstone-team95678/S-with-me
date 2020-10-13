import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Accordion, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class BookDetailApp extends PureComponent {
  componentDidMount() {
    const { bookId } = this.props.match.params;
    this.props.requestChapterList({ bookId: bookId }, true);
  }

  render() {
    const { chapterList, styles } = this.props;
    const rootPanels = chapterList.map(({ mainChapter, subChapters }) => {
      const key = mainChapter.mainChapterId;
      const title = mainChapter.mainChapterName;

      const subChapterPanels = subChapters.map((subChapter, index) => {
        const key = subChapter.subChapterId;
        const title = subChapter.subChapterName;

        const buttons = (
          <div>
            <Button icon labelPosition="left" basic color="brown">
              <Icon name="edit" />
              수정
            </Button>
            <Link to={`/inventory/${key}/problems`}>
              <Button icon labelPosition="right" basic color="orange">
                Go!
                <Icon name="right arrow" />
              </Button>
            </Link>
          </div>
        );

        return { key, title, content: { content: buttons } };
      });

      const subChapterContent = (
        <div>
          <Button icon basic color="brown">
            <Icon name="edit" />
            수정
          </Button>
          <Accordion.Accordion panels={subChapterPanels} />
        </div>
      );

      return { key, title, content: { content: subChapterContent } };
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }} {...css(styles.table)}>
          표지 가격 Monthly 수익 등등 보기
        </div>
        <div style={{ flex: 4 }} {...css(styles.table)}>
          <div>문제집 이름 / 문제집 정보 수정 / 판매중 버튼</div>
          <div>목차</div>
          <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
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
