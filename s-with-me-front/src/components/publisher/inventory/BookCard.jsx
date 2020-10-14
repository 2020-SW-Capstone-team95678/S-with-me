import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Image, Label, Card } from 'semantic-ui-react';

import Heading from '../../../common-ui/Heading';

export default function BookCard(props) {
  const { cover, grade, price, subject, name } = props.book;

  return (
    <div>
      <div style={{ minHeight: '230px' }}>
        <Link
          to={{
            pathname: `/inventory/${name}/table-of-contents`,
            state: {
              book: props.book,
            },
          }}
        >
          <Image rounded src={cover} size="small" centered />
        </Link>
      </div>

      <Card.Content textAlign="center">
        <div style={{ paddingTop: 10 }}>
          <Card.Description textAlign="center">
            <Heading level={6}>{name}</Heading>
          </Card.Description>
          <Card.Meta>
            <Label>
              {grade}학년 / {price}원
            </Label>
            <Label icon="globe" content={subject} />
          </Card.Meta>
        </div>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <div style={{ paddingTop: 5 }}>
          <Link
            to={{
              pathname: `/inventory/${name}/table-of-contents`,
              state: {
                book: props.book,
              },
            }}
          >
            <Button basic color="green" size="mini">
              목차 보기
            </Button>
          </Link>
        </div>
      </Card.Content>
    </div>
  );
}
