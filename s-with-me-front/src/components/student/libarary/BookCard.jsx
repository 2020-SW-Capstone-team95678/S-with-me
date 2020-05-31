import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { ItemTypes } from '../../../constants/itemTypes';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';
import bookImage from '../../../common-ui/bookImage.png';

function BookCard(props) {
  const { myBookId, lastPageNumber, lastSubChapterId } = props.myBook;
  const { subject, name, cover, grade } = props.book;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { myBookId: myBookId, type: ItemTypes.BOOKCARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <>
      <DragPreviewImage connect={preview} src={bookImage} />
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
        <Card vertical={20} horizontal={4}>
          {cover}
          <Button primary small>
            삭제
          </Button>
          <Heading level={5}>{name}</Heading>
          <Heading level={6}>
            {grade}학년 / 과목:{subject}
          </Heading>
          <InlineList spacingBetween={1}>
            <Link to={`/library/myBook/${myBookId}`}>
              <Button xsmall>목차 보기</Button>
            </Link>
            <Link
              to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}
            >
              <Button xsmall>이어 풀기</Button>
            </Link>
          </InlineList>
        </Card>
      </div>
    </>
  );
}

export default BookCard;
