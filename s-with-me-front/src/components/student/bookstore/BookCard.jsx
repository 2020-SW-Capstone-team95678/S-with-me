import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function BookCard(props) {
  const { book } = props;
  return (
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
        <a>
          <Icon name="won sign" />
          {book.price}
        </a>
      </Card.Content>
    </Card>
  );
}
