import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Button } from 'semantic-ui-react';

const CreateSubChapterPage = props => {
  const { mainChapterId } = props;
  const [subChapterTitle, setSubChapterTitle] = useState('');


  return (
    <Modal>
      {({ closeModal }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            소단원 만들기
            <br />
            <br />
            {/* <h2>mainChapter Id : {mainChapterId}</h2>
            <h2>subChapter Id : {subChapterId}</h2> */}
            소단원 제목
            <input
              type="text"
              value={subChapterTitle}
              placeholder="please input name"
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
            />
            <br></br>
            <br></br>
            <Button
              onClick={() => {
                Api.post('/publisher/library/book/main-chapter/sub-chapter', {
                  subChapterName: subChapterTitle,
                  mainChapterId: mainChapterId,
                })
              }}
            >
              등록 하기
            </Button>
            <Button
              style={{marginTop:5}}
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateSubChapterPage;
