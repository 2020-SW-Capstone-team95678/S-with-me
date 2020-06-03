import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Api from '../../../Api';

import 'react-accessible-accordion/dist/fancy-example.css';
const EditBook = props => {
  const { bookId } = props.match.params;

  const [selectedSubChapter, setSelectedSubChapter] = useState(null);

  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/publisher/library/book/${bookId}`);
      console.log(data);
      setBookInfo(data.data);
    };

    fetchData();
  }, []);

  if (!bookInfo) {
    return 'not selected';
  }

  return (
    <div>
      <div>
        <p>제목</p>
        <input value={bookInfo.name}></input>
      </div>
      <div>
        <p>가격</p>
        <input value={bookInfo.price}></input>
      </div>
      <div>
        <p>학년</p>
        <input value={bookInfo.grade}></input>
      </div>
      <div>
        <p>설명</p>
        <input value={bookInfo.introduction}></input>
      </div>

      <button
        onClick={() => {
          Api.put(`/publisher/library/book/${bookId}`, {
            params: {
              publisherId: 1,
            },
          })
            .then(({ data }) => {})
            .catch(reason => {});
        }}
      >
        저장
      </button>

      <ChapterInfo
        bookId={bookId}
        onClick={subChapterId => {
          setSelectedSubChapter(subChapterId);
        }}
      />
      <ProblemInfo subChapterId={selectedSubChapter} />
    </div>
  );
};

const ChapterInfo = ({ bookId, onClick }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/library/book/${bookId}/chapters`);
      setChapters(data.data);
    };

    if (bookId) {
      fetchData();
    }
    console.log(bookId);
  }, [bookId]);

  return (
    <Accordion>
      {chapters.map(chapter => {
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                {chapter.mainChapterResponseDto.mainChapterId}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <button>추가</button>
              <ol>
                {chapter.subChapterResponseDtoList.map(subChapter => {
                  return (
                    <li
                      onClick={() => {
                        onClick(subChapter.subChapterId);
                      }}
                    >
                      {subChapter.subChapterName}
                    </li>
                  );
                })}
              </ol>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const ProblemInfo = ({ subChapterId }) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/publisher/library/book/mainChapter', {
        params: {
          subChapterId: subChapterId,
        },
      });

      setProblems(data.data);
    };

    if (subChapterId) {
      fetchData();
    }
    console.log(subChapterId);
  }, [subChapterId]);

  return (
    <div>
      {problems.map(problem => {
        return <p>{problem.content}</p>;
      })}
    </div>
  );
};

export default EditBook;
