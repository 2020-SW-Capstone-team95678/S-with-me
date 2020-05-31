import React from 'react';

import { ItemTypes } from '../../../constants/itemTypes';
import { useDrop } from 'react-dnd';

import Button from '../../../common-ui/Button';

export default function FolderButton(props) {
  const { folderId, folderName, moveMyBook } = props;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOOKCARD,
    drop: item => {
      console.log(item.myBookId);
      moveMyBook(item.myBookId, { folderId: folderId }, () => {});
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ position: 'relative' }}>
      <Button primary={isOver}>{folderName}</Button>
    </div>
  );
}
