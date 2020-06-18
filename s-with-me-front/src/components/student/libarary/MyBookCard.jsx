import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { ItemTypes } from '../../../constants/itemTypes';
import { Button, Modal, Image, Label, Card } from 'semantic-ui-react';
import { isMobileOnly } from 'react-device-detect';

import Heading from '../../../common-ui/Heading';
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
          <Card textAlign="center">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/library/myBook/${myBookId}`}>
                <Image rounded src={cover} size="small" />
              </Link>
            </div>
            <Card.Content textAlign="center">
              <Card.Description textAlign="center">
                <Heading level={6}>{name}</Heading>
              </Card.Description>
              <Card.Meta>
                <Label icon="graduation" content={grade + '학년'} />
                <Label icon="tags" content={subject} />
              </Card.Meta>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <Link to={`/library/myBook/${myBookId}`}>
                <Button basic color="green" size="mini">
                  목차 보기
                </Button>
              </Link>
              <Link
                to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}
              >
                <Button basic color="green" size="mini">
                  이어 풀기
                </Button>
              </Link>
              <Button basic color="red" onPress={show(true)} size="mini">
                삭제
              </Button>
              <Modal dimmer={dimmer} open={open} onClose={close} size="tiny">
                <Modal.Content>
                  <p>정말로 삭제하시겠습니까?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={close} negative content="No" />
                  <Button
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="Yes"
                    onClick={handleDelete}
                  />
                </Modal.Actions>
              </Modal>
            </Card.Content>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Link to={`/library/myBook/${myBookId}`}>
          <Image rounded src={cover} size="tiny" floated="left" />
        </Link>
        <Card.Content textAlign="center">
          <div style={{ paddingTop: 10 }}>
            <Card.Description textAlign="center">
              <Heading level={6}>{name}</Heading>
            </Card.Description>
            <Card.Meta>
              <Label>{grade}학년</Label>
              <Label icon="globe" content={subject} />
            </Card.Meta>
          </div>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <div style={{ paddingTop: 5 }}>
            <Link to={`/library/myBook/${myBookId}`}>
              <Button basic color="green" size="mini">
                목차 보기
              </Button>
            </Link>
            <Link
              to={`/library/myBook/${myBookId}/solve/${lastSubChapterId}?page=${lastPageNumber}`}
            >
              <Button basic color="green" size="mini">
                이어 풀기
              </Button>
            </Link>
            <Button basic color="red" onPress={show(true)} size="mini">
              삭제
            </Button>
          </div>

          <Modal dimmer={dimmer} open={open} onClose={close} size="tiny">
            <Modal.Content>
              <p>정말로 삭제하시겠습니까?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={close} negative content="No" />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yes"
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </div>
    );
  }
}
