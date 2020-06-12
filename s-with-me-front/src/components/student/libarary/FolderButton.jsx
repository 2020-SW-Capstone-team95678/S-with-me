import React from 'react';

import { ItemTypes } from '../../../constants/itemTypes';
import { useDrop } from 'react-dnd';

import Button from '../../../common-ui/Button';

export default function FolderButton(props) {
  const { folderId, folderName, moveMyBook, requestFilteredMyBookList } = props;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOOKCARD,
    drop: item => {
      moveMyBook(item.myBookId, { folderId: folderId }, () => {
        requestFilteredMyBookList('FOLDER', { folderId: folderId });
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ position: 'relative' }}>
      <Button
        primary={isOver}
        onPress={() => requestFilteredMyBookList('FOLDER', { folderId: folderId })}
      >
        {folderName}
      </Button>
    </div>
  );
}
