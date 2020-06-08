import React from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Card from '../../../common-ui/Card';
import InlineList from '../../../common-ui/InlineList';
import BookCard from './BookCard';

function BookstoreTable(props) {
  const { styles, bookList, adBookList } = props;
  return (
    <div style={{ flex: 4 }} {...css(styles.box)}>
      <div style={{ flex: 1 }}>
        <Card vertical={2}>
          <div {...css(styles.head)}>SwithMe Pick!</div>
        </Card>
        <div style={{ padding: 3 }}>
          <InlineList spacingBetween={1}>
            {/* {adBookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))} */}
          </InlineList>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Card vertical={2}>
          <div {...css(styles.head)}>일반 서적</div>
        </Card>
        <div style={{ padding: 3 }}>
          <InlineList spacingBetween={1}>
            {bookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </InlineList>
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
    paddingBottom: 11,
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
