import React from 'react';
import { Grid, Label, Segment, List } from 'semantic-ui-react';

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
          <List divided verticalAlign="middle">
            <List.Item>
              <List.Content>이름: {book.name}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>학년: {book.grade}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>과목: {book.subject}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>가격: {book.price}원</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>출판일: {book.publishedDate}</List.Content>
            </List.Item>
          </List>
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
