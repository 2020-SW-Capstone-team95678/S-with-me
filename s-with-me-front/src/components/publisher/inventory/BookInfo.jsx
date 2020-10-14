import React from 'react';

import { Image, Label, Card } from 'semantic-ui-react';

export default function BookInfo(props) {
  const { cover, grade, introduction, price, subject, publishedDate } = props.book;

  return (
    <Card>
      <Image src={cover} wrapped ui={false} />
      <Card.Content>
        <Card.Meta>
          <span className="date">출판 {publishedDate}</span>
        </Card.Meta>
        <Card.Description>{introduction}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label icon="graduation" content={grade} />
        <Label icon="book" content={subject} />
        <Label icon="won sign" content={price} />
      </Card.Content>
    </Card>
  );
}
