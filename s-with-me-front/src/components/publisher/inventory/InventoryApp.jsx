import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import BookOverview from './BookOverview';
import { Button, Modal, Form } from 'semantic-ui-react';

class InventoryApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      open: false,
      grade: undefined,
      bookName: undefined,
      introduction: undefined,
      subject: undefined,
      price: undefined,
      isOnSale: undefined,
      file: '',
      previewURL: '',
      year: undefined,
      month: undefined,
      day: undefined,
    };
  }

  componentDidMount() {
    const { requestBookList } = this.props;
    const publisherId = window.sessionStorage.getItem('publisherId');
    requestBookList({ publisherId: publisherId });
  }

  handleGrade = (e, { grade }) => this.setState({ grade });
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleFileOnChange = (event) => {
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

  handleModal = () => {
    const { name, grade, subject, price, introduction, isOnSale, previewURL } = this.state;
    const { year, month, day } = this.state;
    const publisherId = window.sessionStorage.getItem('publisherId');
    const formData = {
      publisherId,
      publishedDate: `${year}-${month}-${day}`,
      cover: previewURL,
      grade,
      introduction,
      isOnSale,
      name,
      price,
      subject,
    };
    this.props.createBook(formData, () => {
      this.setState({ open: false });
      this.setState({
        open: false,
        grade: undefined,
        name: undefined,
        introduction: undefined,
        subject: undefined,
        price: undefined,
        isOnSale: undefined,
        file: '',
        previewURL: '',
        year: undefined,
        month: undefined,
        day: undefined,
      });
      this.props.requestBookList({ publisherId: publisherId });
    });
  };

  render() {
    const { bookList, isLoading, styles } = this.props;
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
        <Modal.Content scrolling>
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
              name="name"
              placeholder="문제집 이름"
              value={this.state.name}
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
                placeholder="일"
              />
            </Form.Group>
            <Form.Input
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              name="mySolutionImage"
              onChange={this.handleFileOnChange}
            />
            {bookCover_preview}
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
      <div {...css(styles.app)}>
        <div style={{ flex: 3, padding: 20 }} {...css(styles.table)}>
          <Button
            fluid
            basic
            color="orange"
            onClick={() => this.setState({ open: true })}
            content="새로운 책 추가"
            icon="add"
          />
          <BookOverview bookList={bookList} isLoading={isLoading} />
        </div>
        {modal}
      </div>
    );
  }
}

export default withStyles(({ responsive }) => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 11,
    paddingTop: 11,
    fontWeight: 'bold',
  },
  app: {
    display: 'flex',
    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
  table: {
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(InventoryApp);
