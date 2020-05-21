import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';
import Api from '../../../Api';

export default class BookPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      name: '',
      cover: null,
      grade: -1,
    };
  }

  componentDidMount() {
    const { myBook } = this.props;
    Api.get('student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) =>
      this.setState({
        subject: data.subject,
        name: data.name,
        cover: data.cover,
        grade: data.grade,
      }),
    );
  }
  render() {
    const { myBook } = this.props;
    const { subject, name, cover, grade } = this.state;
    return (
      <Card vertical={20} horizontal={4}>
        {cover}
        <Button primary small>
          삭제
        </Button>
        <Heading level={5}>{name}</Heading>
        <Heading level={6}>
          {grade}학년 / 과목:{subject}
        </Heading>
        <InlineList spacingBetween={1}>
          <Link to={`/library/myBook/${myBook.myBookId}`}>
            <Button xsmall>목차 보기</Button>
          </Link>
          <Link to={`/library/myBook/${myBook.myBookId}/solve`}>
            <Button xsmall>이어 풀기</Button>
          </Link>
        </InlineList>
      </Card>
    );
  }
}
