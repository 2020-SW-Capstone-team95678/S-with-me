import React, { Component } from 'react';

import Api from '../../../Api';
import BookCard from './BookCard';

export default class BookPreview extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { book: {}, shouldUpdate: false };
  }

  componentDidMount() {
    this._isMounted = true;
    const { myBook } = this.props;
    Api.get('student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) => {
      if (this._isMounted) {
        this.setState({ book: data });
      }
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.myBook.bookId !== prevState.book.bookId) {
      return { shouldUpdate: true };
    }
    return { shouldUpdate: false };
  }

  componentDidUpdate() {
    this._isMounted = true;
    const { myBook } = this.props;
    if (this.state.shouldUpdate)
      Api.get('student/library/my-book', { params: { bookId: myBook.bookId } }).then(({ data }) => {
        if (this._isMounted) {
          this.setState({ book: data });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { myBook } = this.props;
    return <BookCard book={this.state.book} myBook={myBook} />;
  }
}
