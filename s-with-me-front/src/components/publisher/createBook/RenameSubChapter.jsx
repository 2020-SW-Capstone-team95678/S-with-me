import React, { useState } from 'react';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Button } from 'semantic-ui-react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';


const RenameMainChapter = props => {
  const { bookId, chapter,check,setCheck,doneCallback } = props;
  const [subChapterTitle, setSubChapterTitle] = useState('');
  const [subChapters, setSubChapters] = useState(chapter.subChapterResponseDtoList);//상태변화에 필요


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
                  Api.put(`/publisher/library/book/main-chapter/sub-chapter/${subChapterId}`,{mainChapterId:mainChapterId, subChapterName:subChapterTitle})
                    .then(response =>
                      setSubChapters(prev => {
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

            <Button
              onClick={() => {
                console.log(subChapters);
                doneCallback({
                  
                  subChapters
                });
                setCheck(!check);
                console.log("here");
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


export default RenameMainChapter;
