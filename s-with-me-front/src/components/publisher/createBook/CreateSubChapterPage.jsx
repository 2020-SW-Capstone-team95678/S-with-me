import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
const CreateSubChapterPage = props => {
  const { mainChapterId } = props;
  const [subChapterTitle, setSubChapterTitle] = useState('');

  console.log(mainChapterId);

  return (
    <Modal>
      {({ closeModal }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            SubChapter info
            <br />
            <br />
            {/* <h2>mainChapter Id : {mainChapterId}</h2>
            <h2>subChapter Id : {subChapterId}</h2> */}
            Name
            <input
              type="text"
              value={subChapterTitle}
              placeholder="please input name"
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
            />
            <br></br>
            <br></br>
            <button
              onClick={() => {
                Api.post('/publisher/library/book/main-chapter/sub-chapter', {
                  subChapterName: subChapterTitle,
                  mainChapterId: mainChapterId,
                })
              }}
            >
              등록
            </button>
            <button
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateSubChapterPage;
