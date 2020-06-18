import React from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Card from '../../../common-ui/Card';
import InlineList from '../../../common-ui/InlineList';
import BookCard from './BookCard';

import PaginationContainer from '../../../containers/student/PaginationContainer';

function BookstoreTable(props) {
  const { styles, bookList, adBookList } = props;
  return (
    <div style={{ flex: 4 }} {...css(styles.box)}>
      <div style={{ flex: 1 }}>
        <Card vertical={2}>
          <div {...css(styles.head)}>SwithMe Pick!</div>
        </Card>
        <div style={{ paddingBottom: 15 }}>
          <InlineList spacingBetween={1} align="center">
            {adBookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </InlineList>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Card vertical={2}>
          <div {...css(styles.head)}>일반 서적</div>
        </Card>
        <div style={{ padding: 3 }}>
          <InlineList spacingBetween={1} align="center">
            {bookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </InlineList>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
            <PaginationContainer isBookstore />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(() => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 11,
    fontWeight: 'bold',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(BookstoreTable);
