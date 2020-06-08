import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function BookCard(props) {
  const { book } = props;
  return (
    <Link to={`/bookstore/detail/${book.bookId}`}>
      <Card fluid>
        <Card.Content>
          <Image centered size="small" src={book.cover} />
          <Card.Description>{book.name}</Card.Description>
          <Card.Description>
            {book.grade}학년 / 과목: {book.subject}
          </Card.Description>
          <Card.Meta>
            <span className="date">{book.publishedDate}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Icon name="won sign" />
          {book.price}
        </Card.Content>
      </Card>
    </Link>
  );
}
