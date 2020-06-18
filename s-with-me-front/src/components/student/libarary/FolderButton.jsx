import React from 'react';

import { ItemTypes } from '../../../constants/itemTypes';
import { useDrop } from 'react-dnd';
import { isMobileOnly } from 'react-device-detect';

export default function FolderButton(props) {
  const { folderId, folderName, moveMyBook, requestFilteredMyBookList } = props;
  if (!isMobileOnly) {
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
      <div
        ref={drop}
        style={{
          position: 'relative',
          fontSize: 'large',
          color: isOver ? 'red' : 'black',
          fontWeight: isOver ? 'bold' : 'normal',
        }}
        onClick={() => requestFilteredMyBookList('FOLDER', { folderId: folderId })}
      >
        {folderName}
      </div>
    );
  } else {
    return (
      <div
        onClick={() => requestFilteredMyBookList('FOLDER', { folderId: folderId })}
        style={{ fontSize: 'large' }}
      >
        {folderName}
      </div>
    );
  }
}
