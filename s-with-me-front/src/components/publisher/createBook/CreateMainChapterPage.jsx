import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
const CreateMainChapterPage = props => {
  const { bookId } = props;
  const [mainChapterId, setMainChapterId] = useState(null);
  const [mainChapterTitle, setMainChapterTitle] = useState('');

  console.log(bookId);

  return (
    <Modal>
      {({ closeModal }) => (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            MainChapter info
            <br />
            <br />
            {/* <h2>book Id : {bookId}</h2>
            <h2>mainChapter Id : {mainChapterId}</h2> */}
            Name
            <input
              type="text"
              value={mainChapterTitle}
              placeholder="please input name"
              onChange={({ target: { value } }) => setMainChapterTitle(value)}
            />
            <br></br>
            <br></br>
            <button
              onClick={() => {
                Api.post('/publisher/library/book/mainChapter', {
                  mainChapterName: mainChapterTitle,
                  bookId: bookId,
                }).then(response => {
                  setMainChapterId(response.data);
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

export default CreateMainChapterPage;
