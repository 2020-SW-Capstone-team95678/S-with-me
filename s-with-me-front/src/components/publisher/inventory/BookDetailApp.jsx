import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Accordion, Button, Form, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Text from '../../../common-ui/Text';
import BookInfo from './BookInfo';

class BookDetailApp extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      book: undefined,
      isAddingMain: false,
      isEditMain: false,
      isAddingSub: false,
      mainChapter: '',
      subChapter: '',
    };
  }
  componentDidMount() {
    const { book } = this.props.location.state;
    this.props.requestChapterList({ bookId: book.bookId }, true);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (isMainChapter, editMainId, editSubId) => {
    const { book } = this.props.location.state;
    const {
      requestChapterList,
      createMainChapter,
      updateMainChapter,
      createSubChapter,
    } = this.props;
    if (isMainChapter) {
      const formData = { bookId: book.bookId, mainChapterName: this.state.mainChapter };
      if (editMainId) {
        updateMainChapter(editMainId, formData, () => {
          requestChapterList({ bookId: book.bookId }, true);
          this.setState({ mainChapter: '', isEditMain: !this.state.isEditMain });
        });
      } else {
        createMainChapter(formData, () => {
          requestChapterList({ bookId: book.bookId }, true);
          this.setState({ mainChapter: '', isAddingMain: !this.state.isAddingMain });
        });
      }
    } else {
      const formData = { mainChapterId: editMainId, subChapterName: this.state.subChapter };
      if (editSubId) {
      } else {
        createSubChapter(formData, () => {
          requestChapterList({ bookId: book.bookId }, true);
          this.setState({ subChapter: '', isAddingSub: !this.state.isAddingSub });
        });
      }
    }
  };

  render() {
    const { chapterList, styles } = this.props;
    const { book } = this.props.location.state;
    const { name } = this.props.match.params;
    const rootPanels = chapterList.map(({ mainChapter, subChapters }) => {
      const key = mainChapter.mainChapterId;
      const mainTitle = mainChapter.mainChapterName;

      const subChapterPanels = subChapters.map(subChapter => {
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
          <Button
            basic
            color="brown"
            icon="edit"
            content="이름 수정"
            onClick={() => this.setState({ isEditMain: !this.state.isEditMain })}
          />
          <Button
            basic
            floated="right"
            labelPosition="right"
            positive
            icon="add"
            content="소단원 추가"
            onClick={() => this.setState({ isAddingSub: !this.state.isAddingSub })}
          />
          <Button
            basic
            negative
            icon="remove"
            content="대단원 삭제"
            onClick={() => {
              this.props.deleteMainChapter(key, () => {
                this.props.requestChapterList({ bookId: book.bookId }, true);
              });
            }}
          />
          {this.state.isEditMain ? (
            <Segment>
              <Form onSubmit={() => this.handleSubmit(true, key)}>
                <Form.Input
                  label="새로운 대단원명"
                  placeholder="수정할 대단원의 제목을 입력해 주세요."
                  name="mainChapter"
                  onChange={this.handleChange}
                />
                <Form.Button type="submit" icon="plus" content="제출" basic />
              </Form>
            </Segment>
          ) : null}
          <Accordion.Accordion panels={subChapterPanels} />
          {this.state.isAddingSub ? (
            <Segment>
              <Form onSubmit={() => this.handleSubmit(false, key)}>
                <Form.Input
                  label="새로운 소단원명"
                  placeholder="추가할 소단원 제목을 입력해 주세요."
                  name="subChapter"
                  onChange={this.handleChange}
                />
                <Form.Button type="submit" icon="plus" content="제출" basic />
              </Form>
            </Segment>
          ) : null}
        </div>
      );

      return { key, title: mainTitle, content: { content: subChapterContent } };
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          {...css(styles.table)}
        >
          <Segment color="blue">문제집 정보</Segment>
          <Button
            attached="bottom"
            icon="barcode"
            size="medium"
            content={book.isOnSale ? '판매 중' : '판매 중지 상태'}
            // onClick={() => this.setState({ isAdding: !isAdding })}
          />
          <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
            <BookInfo book={book} />
          </div>
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
            onClick={() => this.setState({ isAddingMain: !this.state.isAddingMain })}
          />
          <Accordion defaultActiveIndex={0} panels={rootPanels} styled fluid />
          {this.state.isAddingMain ? (
            <Segment>
              <Form onSubmit={() => this.handleSubmit(true)}>
                <Form.Input
                  label="새로운 대단원명"
                  placeholder="추가할 대단원의 제목을 입력해 주세요."
                  name="mainChapter"
                  onChange={this.handleChange}
                />
                <Form.Button type="submit" icon="plus" content="제출" basic />
              </Form>
            </Segment>
          ) : null}
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
