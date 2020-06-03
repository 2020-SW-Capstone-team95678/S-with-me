import React, { PureComponent } from 'react';

import Api from '../../../Api';
import BookCard from './BookCard';

export default class BookPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { book: {} };
  }

  componentDidMount() {
    const { myBook } = this.props;
    Api.get('student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) =>
      this.setState({ book: data }),
    );
  }
  componentDidUpdate() {
    const { myBook } = this.props;
    Api.get('student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) =>
      this.setState({ book: data }),
    );
  }
  render() {
    const { myBook } = this.props;
    return <BookCard book={this.state.book} myBook={myBook} />;
  }
}
