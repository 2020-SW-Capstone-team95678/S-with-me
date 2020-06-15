import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { ItemTypes } from '../../../constants/itemTypes';
import { Button as SemanticButton, Modal } from 'semantic-ui-react';
import { isMobile, isMobileOnly } from 'react-device-detect';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';
import bookImage from '../../../common-ui/bookImage.png';

export default function MyBookCard(props) {
  const { myBookId, lastPageNumber, lastSubChapterId } = props.myBook;
  const { subject, name, cover, grade } = props.book;

  const [dimmer, setDimmer] = useState('inverted');
  const [open, setOpen] = useState(false);
  const show = dimmer => () => {
    setOpen(true);
    setDimmer(dimmer);
  };
  const close = () => setOpen(false);
  const handleDelete = () => {
    const { deleteMyBook, requestMyBookList } = props;
    const studentId = window.sessionStorage.getItem('studentId');
    deleteMyBook(myBookId, () => {
      requestMyBookList({ studentId });
      close();
    });
  };

  if (!isMobileOnly) {
    const [{ isDragging }, drag, preview] = useDrag({
      item: { myBookId: myBookId, type: ItemTypes.BOOKCARD },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <>
        <DragPreviewImage connect={preview} src={bookImage} />
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', paddingLeft: 2 }}>
          <Card vertical={isMobile ? 10 : 20} horizontal={isMobile ? 2 : 4}>
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
              <Button primary small onPress={show(true)}>
                삭제
              </Button>
              <Modal dimmer={dimmer} open={open} onClose={close} size="tiny">
                <Modal.Content>
                  <p>정말로 삭제하시겠습니까?</p>
                </Modal.Content>
                <Modal.Actions>
                  <SemanticButton onClick={close} negative content="No" />
                  <SemanticButton
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="Yes"
                    onClick={handleDelete}
                  />
                </Modal.Actions>
              </Modal>
            </InlineList>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <Card vertical={isMobile ? 10 : 20} horizontal={isMobile ? 2 : 4}>
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
          <Link to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}>
            <Button xsmall>이어 풀기</Button>
          </Link>
          <Button primary small onPress={show(true)}>
            삭제
          </Button>
          <Modal dimmer={dimmer} open={open} onClose={close} size="tiny">
            <Modal.Content>
              <p>정말로 삭제하시겠습니까?</p>
            </Modal.Content>
            <Modal.Actions>
              <SemanticButton onClick={close} negative content="No" />
              <SemanticButton
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yes"
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </InlineList>
      </Card>
    );
  }
}
