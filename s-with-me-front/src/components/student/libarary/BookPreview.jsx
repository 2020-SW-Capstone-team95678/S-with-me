import React, { PureComponent } from 'react';

import Api from '../../../Api';
import BookCard from './BookCard';

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
  componentDidUpdate() {
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
    return <BookCard book={this.state} myBook={myBook} />;
  }
}
