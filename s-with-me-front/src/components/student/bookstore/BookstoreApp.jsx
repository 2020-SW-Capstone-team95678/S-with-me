import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import BookstoreTable from './BookstoreTable';
import BookstoreFilterContainer from '../../../containers/student/book/BookstoreFilterContainer';

class BookstoreApp extends PureComponent {
  componentDidMount() {
    const { requestBookList, requestAdBookList } = this.props;
    const grade = window.sessionStorage.getItem('grade');
    requestBookList(grade);
    requestAdBookList(grade);
  }
  render() {
    const { bookList, adBookList, styles } = this.props;
    return (
      <div {...css(styles.app)}>
        <BookstoreFilterContainer />
        <BookstoreTable bookList={bookList} adBookList={adBookList} />
      </div>
    );
  }
}

export default withStyles(({ responsive }) => ({
  app: {
    display: 'flex',

    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
}))(BookstoreApp);
