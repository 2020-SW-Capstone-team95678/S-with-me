import React from 'react';
import { Grid, Label, Segment } from 'semantic-ui-react';

export default function BookInfo(props) {
  const { book } = props;
  return (
    <Grid columns={1} rows={2}>
      <Grid.Column>
        <Segment raised>
          <Label as="a" color="red" ribbon>
            Overview
          </Label>
          <br />
          <span>
            이름: {book.name} ({book.grade}학년) <br />
            과목: {book.subject} <br />
            가격: {book.price}원 <br />
            출판일: {book.publishedDate}
          </span>
          <br />
          <Label as="a" color="orange" ribbon>
            Introduction
          </Label>
          <br />
          <span>{book.information ? book.information : '책 정보가 없습니다.'}</span>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
