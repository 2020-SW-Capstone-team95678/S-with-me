import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Accordion, Button, Form, Segment, Popup, Modal, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Text from '../../../common-ui/Text';
import BookInfo from './BookInfo';

class BookDetailApp extends PureComponent {
  constructor(props) {
    super();
    const { book } = props.location.state;
    const publishedDates = book.publishedDate.split('-');
    this.state = {
      book: undefined,
      isAddingMain: false,
      isEditMain: false,
      isEditSub: false,
      isAddingSub: false,
      mainChapter: '',
      subChapter: '',
      open: false,
      grade: book.grade,
      bookName: book.name,
      introduction: book.introduction,
      subject: book.subject,
      price: book.price,
      isOnSale: book.isOnSale,
      file: '',
      previewURL: book.cover,
      year: publishedDates[0],
      month: publishedDates[1],
      day: publishedDates[2],
    };
  }
  componentDidMount() {
    const { book } = this.props.location.state;
    this.props.requestChapterList({ bookId: book.bookId }, true);
    const publisherId = window.sessionStorage.getItem('publisherId');
    this.props.requestBookList({ publisherId: publisherId });
  }
  handleGrade = (e, { grade }) => this.setState({ grade });
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleFileOnChange = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (isMainChapter, editMainId, editSubId) => {
    const { book } = this.props.location.state;
    const {
      requestChapterList,
      createMainChapter,
      updateMainChapter,
      createSubChapter,
      updateSubChapter,
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
        updateSubChapter(editSubId, formData, () => {
          requestChapterList({ bookId: book.bookId }, true);
          this.setState({ subChapter: '', isEditSub: !this.state.isEditSub });
        });
      } else {
        createSubChapter(formData, () => {
          requestChapterList({ bookId: book.bookId }, true);
          this.setState({ subChapter: '', isAddingSub: !this.state.isAddingSub });
        });
      }
    }
  };

  handleModal = () => {
    const { book } = this.props.location.state;
    const { bookName, grade, subject, price, introduction, isOnSale, previewURL } = this.state;
    const { year, month, day } = this.state;
    const formData = {
      cover: previewURL,
      publishedDate: `${year}-${month}-${day}`,
      grade: grade,
      introduction: introduction,
      isOnSale: isOnSale,
      name: bookName,
      price: price,
      subject: subject,
    };
    this.props.updateBook(book.bookId, formData, () => {
      this.setState({ open: false });
      const publisherId = window.sessionStorage.getItem('publisherId');
      this.props.requestBookList({ publisherId: publisherId });
    });
  };

  render() {
    const { chapterList, styles } = this.props;
    const { book } = this.props;
    const { name } = this.props.match.params;
    const { grade, file, previewURL } = this.state;

    let bookCover_preview = null;
    if (file) {
      bookCover_preview = (
        <img
          className="profile_preview"
          src={previewURL}
          alt="problem_imgae"
          style={{
            width: 200,
            maxHeight: 500,
            overflow: 'hidden',
          }}
        />
      );
    }

    const rootPanels = chapterList.map(({ mainChapter, subChapters }) => {
      const key = mainChapter.mainChapterId;
      const mainTitle = mainChapter.mainChapterName;

      const subChapterPanels = subChapters.map(subChapter => {
        const subKey = subChapter.subChapterId;
        const subTitle = subChapter.subChapterName;

        const buttons = (
          <div>
            <Button
              basic
              color="brown"
              icon="edit"
              content="이름 수정"
              onClick={() => this.setState({ isEditSub: !this.state.isEditSub })}
            />
            <Button
              basic
              negative
              icon="remove"
              content="소단원 삭제"
              onClick={() => {
                this.props.deleteSubChapter(subKey, () => {
                  this.props.requestChapterList({ bookId: book.bookId }, true);
                });
              }}
            />
            <Link
              to={{
                pathname: `/inventory/${name}/${mainTitle}/${subTitle}/problems`,
                state: {
                  book: book,
                  subChapterId: subKey,
                },
              }}
            >
              <Button icon="right arrow" labelPosition="right" basic color="orange" content="Go!" />
            </Link>
            {this.state.isEditSub ? (
              <Segment>
                <Form onSubmit={() => this.handleSubmit(false, key, subKey)}>
                  <Form.Input
                    label="새로운 소단원명"
                    placeholder="수정할 소단원의 제목을 입력해 주세요."
                    name="subChapter"
                    onChange={this.handleChange}
                  />
                  <Form.Button type="submit" icon="plus" content="제출" basic />
                </Form>
              </Segment>
            ) : null}
          </div>
        );

        return { subKey, title: subTitle, content: { content: buttons } };
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

    const options = [
      { key: 'ko', text: '국어', value: '국어' },
      { key: 'ma', text: '수학', value: '수학' },
      { key: 'so', text: '사회', value: '사회' },
      { key: 'sc', text: '과학', value: '과학' },
      { key: 'en', text: '영어', value: '영어' },
      { key: 'hi', text: '한국사', value: '한국사' },
      { key: 'etc', text: '기타', value: '기타' },
    ];

    const modal = (
      <Modal open={this.state.open}>
        <Modal.Content>
          <Form>
            <Form.Radio
              toggle
              checked={this.state.isOnSale}
              label={this.state.isOnSale ? '판매중' : '판매 중지 상태'}
              onChange={() => this.setState({ isOnSale: !this.state.isOnSale })}
            />
            <Form.Input
              fluid
              label="이름"
              name="bookName"
              placeholder="문제집 이름"
              value={this.state.bookName}
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="과목"
              name="subject"
              options={options}
              placeholder="과목 선택"
              value={this.state.subject}
              onChange={this.handleChange}
            />
            <Form.Group inline>
              <label>학년</label>
              <Form.Radio label="1" grade={1} checked={grade === 1} onChange={this.handleGrade} />
              <Form.Radio label="2" grade={2} checked={grade === 2} onChange={this.handleGrade} />
              <Form.Radio label="3" grade={3} checked={grade === 3} onChange={this.handleGrade} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Year"
                name="year"
                value={this.state.year}
                onChange={this.handleChange}
                placeholder="년"
              />
              <Form.Input
                fluid
                label="Month"
                name="month"
                value={this.state.month}
                onChange={this.handleChange}
                placeholder="월"
              />
              <Form.Input
                fluid
                label="Day"
                name="day"
                value={this.state.day}
                onChange={this.handleChange}
                placeholder="년"
              />
            </Form.Group>
            <Grid>
              <Grid.Column width={5}>
                <Form.Input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  name="mySolutionImage"
                  onChange={this.handleFileOnChange}
                />
              </Grid.Column>
              <Grid.Column>{bookCover_preview}</Grid.Column>
            </Grid>
            <Form.Input
              fluid
              label="가격"
              name="price"
              placeholder="문제집 가격"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <Form.TextArea
              label="소개"
              name="introduction"
              value={this.state.introduction}
              placeholder="책 소개를 입력해주세요"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.setState({ open: false })} content="취소" />
          <Button positive content="확인" onClick={this.handleModal} />
        </Modal.Actions>
      </Modal>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          {...css(styles.table)}
        >
          <Segment color="blue" textAlign="center">
            <Text large>문제집 정보</Text>
          </Segment>
          <Popup
            position="bottom right"
            size="tiny"
            content="문제집 정보를 수정하려면 클릭하세요!"
            trigger={
              <Button
                basic
                attached="bottom"
                icon="barcode"
                size="medium"
                positive={book.isOnSale}
                negative={!book.isOnSale}
                content={book.isOnSale ? '판매 중' : '판매 중지 상태'}
                onClick={() => this.setState({ open: true })}
              />
            }
          />

          <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
            <BookInfo book={book} />
          </div>
        </div>

        <div style={{ flex: 4 }} {...css(styles.table)}>
          <Segment color="blue">
            <Text large>{book.name}</Text>
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
        {modal}
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
