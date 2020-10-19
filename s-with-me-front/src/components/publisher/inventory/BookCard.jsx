import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Image, Label, Card } from 'semantic-ui-react';

import Heading from '../../../common-ui/Heading';

export default function BookCard(props) {
  const { cover, grade, price, subject, name, bookId, isOnSale } = props.book;

  return (
    <div style={{ padding: 5 }}>
      <div style={{ minHeight: '200px', overflow: 'hidden' }}>
        <Link
          to={{
            pathname: `/inventory/${name}/table-of-contents`,
            state: { book: props.book },
          }}
        >
          <Image rounded src={cover} size="small" centered as="img" />
        </Link>
      </div>
      <Card.Content textAlign="center">
        <Card.Description textAlign="center">
          <Heading level={6}>{name}</Heading>
        </Card.Description>
        <Card.Meta>
          <Label
            content={isOnSale ? '판매 중' : '판매 중지'}
            tag
            color={isOnSale ? 'green' : 'red'}
          />
          <Label content={subject} />
          <Label content={`${grade}학년`} />
          <Label content={`${price}원`} />
        </Card.Meta>
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
          <Button
            size="mini"
            basic
            color="red"
            onClick={() =>
              props.deleteBook(bookId, () => {
                const publisherId = window.sessionStorage.getItem('publisherId');
                props.requestBookList({ publisherId: publisherId });
              })
            }
          >
            삭제
          </Button>
        </div>
      </Card.Content>
    </div>
  );
}
