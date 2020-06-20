import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Button } from 'semantic-ui-react';
const CreateMainChapterPage = props => {
  const { bookId, doneCallback,chapters} = props;
  const [mainChapterId, setMainChapterId] = useState(null);
  const [mainChapterTitle, setMainChapterTitle] = useState('');
  const [mainChapterResponseDto,setMainChapterResponseDto]=useState(chapters? chapters:{mainChapterId:"0", mainChapterName:""});
  const [subChapterResponseDtoList,setSubChapterResponseDtoList]=useState([]);
  console.log(mainChapterId);
  //console.log(bookId);

  return (
    <Modal>
      {({ closeModal }) => (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            대단원 만들기
            <br />
            <br />
           
            대단원 제목
            <input
              type="text"
              value={mainChapterTitle}
              placeholder="please input name"
              onChange={({ target: { value } }) => setMainChapterTitle(value)}
            />
            <br></br>
            <br></br>
            <Button
              onClick={() => {
                Api.post('/publisher/library/book/main-chapter', {
                  mainChapterName: mainChapterTitle,
                  bookId,
                }).then(response => {
                  setMainChapterId(response.data);
                  mainChapterResponseDto.mainChapterId=response.data;
                  mainChapterResponseDto.mainChapterName=mainChapterTitle;
                  
                  doneCallback({
                    mainChapterResponseDto,
                    subChapterResponseDtoList
                  });
                  closeModal();
                });
              }}
            >
              등록 하기
            </Button>
            <Button
              style={{marginTop:5}}
              onClick={() => {
                // const chapters = Api.get(`/library/book/${bookId}/chapters`,bookId);
                // console.log(chapters);
                // props.setChapters(chapters);
                // document.location.reload();
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

export default CreateMainChapterPage;
