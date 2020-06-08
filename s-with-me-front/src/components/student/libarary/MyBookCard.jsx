import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { ItemTypes } from '../../../constants/itemTypes';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';
import bookImage from '../../../common-ui/bookImage.png';

export default function MyBookCard(props) {
  const { myBookId, lastPageNumber, lastSubChapterId } = props.myBook;
  const { subject, name, cover, grade } = props.book;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { myBookId: myBookId, type: ItemTypes.BOOKCARD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const handleDelete = () => {
    const { deleteMyBook, requestMyBookList } = props;
    const studentId = window.sessionStorage.getItem('studentId');
    deleteMyBook(myBookId, () => requestMyBookList({ studentId }));
  };
  return (
    <>
      <DragPreviewImage connect={preview} src={bookImage} />
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', paddingLeft: 2 }}>
        <Card vertical={20} horizontal={4}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to={`/library/myBook/${myBookId}`}>
              <img
                src={cover}
                alt="책 커버 이미지"
                style={{ width: 'auto', height: '180px', overflow: 'hidden' }}
              />
            </Link>
          </div>
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
            <Button primary small onPress={handleDelete}>
              삭제
            </Button>
          </InlineList>
        </Card>
      </div>
    </>
  );
}
