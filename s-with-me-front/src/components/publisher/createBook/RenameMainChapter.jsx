import React, { useState, useEffect } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';


const RenameMainChapter = props => {
  const { bookId } = props;
  const [mainChapterTitle, setMainChapterTitle] = useState('');
  const [chapters, setChapters] = useState([]);
  const [books, setBooks] = useState([]); // 지금은 상태변화를 위해 필요해요. 나중에 다시 바꿀게요.

  console.log(bookId);
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/library/book/${bookId}/chapters`);
      setChapters(data.data);
    };

    if (bookId) {
      fetchData();
    }
  }, [bookId]);


  return (
    <Modal>
      {({ closeModal }) => (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            mainChapter를 선택해주세요.
            <Accordion allowZeroExpanded={true}>
      {chapters.map(chapter => {
        const mainChapterId = chapter.mainChapterResponseDto.mainChapterId;
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                {chapter.mainChapterResponseDto.mainChapterName}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel style={{ cursor: 'point' }}>
                수정할 이름
                <input style={{marginLeft:10}}
              type="text"
              value={mainChapterTitle}
              onChange={({ target: { value } }) => setMainChapterTitle(value)}
              onBlur={e => {
                if (e.target.value !== chapter.mainChapterResponseDto.mainChapterName) {
                    chapter.mainChapterResponseDto.mainChapterName=e.target.value;
                  Api.put(`/publisher/library/book/mainChapter/${mainChapterId}`,{ bookId: bookId, mainChapterName:mainChapterTitle})
                    .then(response =>
                      setBooks(prev => {
                        return [...prev];  
                      }),
                    )
                }
              }}
            ></input>
              
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
            <br />
            <br />

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


export default RenameMainChapter;
