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
  const { bookId, chapter } = props;
  const [subChapterTitle, setSubChapterTitle] = useState('');
  const [chapters, setChapters] = useState([]);

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
            subChapter를 선택해주세요.
            <Accordion allowZeroExpanded={true}>
            {chapter.subChapterResponseDtoList.map(subChapter => {
        const subChapterId = subChapter.subChapterId;
        const mainChapterId = subChapter.mainChapterId;
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                {subChapter.subChapterName}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel style={{ cursor: 'point' }}>
                수정할 이름
                <input style={{marginLeft:10}}
              type="text"
              value={subChapterTitle}
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
              onBlur={e => {
                if (e.target.value !== subChapter.subChapterName) {
                    subChapter.subChapterName=e.target.value;
                  Api.put(`/publisher/library/book/mainChapter/subChapter/${subChapterId}`,{mainChapterId:mainChapterId, subChapterName:subChapterTitle})
                    .then(response =>
                      setChapters(prev => {
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
