import React from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Segment, Card } from 'semantic-ui-react';
import BookCard from './BookCard';

import PaginationContainer from '../../../containers/student/PaginationContainer';
import Heading from '../../../common-ui/Heading';

function BookstoreTable(props) {
  const { styles, bookList, adBookList } = props;
  return (
    <div style={{ flex: 4 }} {...css(styles.box)}>
      <div style={{ flex: 1 }}>
        <Segment attached="top" color="orange" textAlign="center">
          <Heading level={4}>SwithMe Pick</Heading>
        </Segment>
        <div style={{ paddingBottom: 20 }}>
          <div style={{ paddingTop: 20 }} />
          <Card.Group centered itemsPerRow={4}>
            {adBookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </Card.Group>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Segment attached="top" color="orange" textAlign="center">
          <Heading level={4}>일반 서적</Heading>
        </Segment>
        <div style={{ padding: 10 }}>
          <div style={{ paddingTop: 10 }} />
          <Card.Group centered itemsPerRow={6}>
            {bookList.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </Card.Group>
          <div
            style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20, paddingTop: 30 }}
          >
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
    borderTop: '0px',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(BookstoreTable);
