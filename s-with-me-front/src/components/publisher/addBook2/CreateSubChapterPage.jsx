import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
import LibraryApp from '../library/LibraryApp';
import ReactDOM from 'react-dom';

const CreateSubChapterPage = props => {
  const { mainChapterId } = props;
  const [subChapterId, setSubChapterId] = useState(null);
  const [subChapterTitle, setSubChapterTitle] = useState('');

  console.log(mainChapterId);

  return (
    <Modal>
      {({ closeModal }) => (
        <div>
          <div>
            SubChapter info
            <br />
            <br />
            <h2>mainChapter Id : {mainChapterId}</h2>
            <h2>subChapter Id : {subChapterId}</h2>
            Name
            <input
              type="text"
              value={subChapterTitle}
              placeholder="please input name"
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
            />
            <button
              onClick={() => {
                Api.post('/publisher/library/book/mainChapter/subChapter', {
                  subChapterName: subChapterTitle,
                  mainChapterId: mainChapterId,
                }).then(response => {
                  setSubChapterId(response.data);
                });
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
