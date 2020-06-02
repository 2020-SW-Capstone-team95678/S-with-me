import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
 
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import LibraryFolderList from './LibraryFolderList';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';
import BookPreview from './BookPreview';
import Api from '../../../Api';

import 'react-accessible-accordion/dist/fancy-example.css';
import CheckBox from '../../../common-ui/CheckBox';

const LibraryApp = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/publisher/library/book', {
        params: {
          publisherId: 1,
        },
      });

      setBooks(data.data);
      setSelectedBook(books[0]);
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: 3 }}>
        <Button primary onPress={() => {}}>
          추가
        </Button>
        <div>
          <ol style={{ overflow: 'hidden', 'overflow-y': 'scroll' }}>
            {books.map(book => {
              return <SideBookInfo book={book} onClick={() => setSelectedBook(book)} />;
            })}
          </ol>
        </div>
      </div>
      <div style={{ flex: 4, padding: 3 }}>
        {
          (() => {
            if(selectedBook)
              return <BookInfo book={selectedBook} setBooks={setBooks}/>
          })()
        }
      </div>
    </div>
  );
};

const SideBookInfo = ({ book, onClick}) => {
  return (
    <li onClick={onClick}>
      <div>
        <img
          width={100}
          src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
        />
      </div>
      <div>{book.name}</div>
      <button>x</button>
    </li>
  );
};
const BookInfo = ({ book, setBooks }) => {
  const [selectedSubChapter, setSelectedSubChapter] = useState(null);

  const [name, setName] = useState(book.name);
  const [price, setPrice] = useState(book.price);

  useEffect(() => {
    setName(book.name ? book.name : "");
    setPrice(book.price ? book.price: 0);
  }, [book])

  function handleEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  return (
    <div>
      <div>
        <p>제목</p>
        <input
        type="text"
          value={name}
          onKeyDown={handleEnter}
          onChange={e => setName(e.target.value)}
          onBlur={e => {
            if (e.target.value !== book.name) {
              book.name = name;

              Api.put(`/publisher/library/book/${book.bookId}`, book)
                .then(response => setBooks(prev => {
                  return [...prev, book];
                }))
                .catch(reason => setName(book.name));
            }
          }}
        ></input>
      </div>
      <div>
        <p>가격</p>
        <input
        type="number"
          value={price}
          onKeyDown={handleEnter}
          onChange={e => setPrice(e.target.value)}
          onBlur={e => {
            if (e.target.value !== book.price) {
              book.price = price;

              Api.put(`/publisher/library/book/${book.bookId}`, book)
                .then(response => setBooks(prev => {
                  return [...prev, book];
                }))
                .catch(reason => setPrice(book.price));
            }
          }}
        ></input>
      </div>
      <div>
        <p>학년</p>
        <input value={book.grade}></input>
      </div>
      <div>
        <p>설명</p>
        <input value={book.introduction}></input>
      </div>

      <ChapterInfo
        bookId={book.bookId}
        onClick={subChapterId => {
          setSelectedSubChapter(subChapterId);
        }}
      />
      <ProblemInfo subChapterId={selectedSubChapter} />
    </div>
  );
};

const ChapterInfo = ({bookId, onClick}) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/library/book/${bookId}/chapters`);
      setChapters(data.data);
    };

    if(bookId)
    {
      fetchData();
    }
  }, [bookId]);

  return (
    <Accordion allowZeroExpanded={true}>
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
                  return <li onClick={() => {onClick(subChapter.subChapterId);}}>{subChapter.subChapterName}</li>;
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
  }, [subChapterId]);

  return (
    <div>
      {problems.map(problem => {
        return <ProblemItem problem={problem}/>;
      })}
    </div>
  );
};

const ProblemItem = ({ problem }) => {
  const [isOptional, setIsOptional] = useState(problem.isOptional);

  return (
    <div>
      <p>{problem.content}</p>
      <p>{problem.solution}</p>
      <p>{problem.answer}</p>
      <CheckBox checked={isOptional} onChange={(name, value) => {
        Api.put(`/publisher/library/book/mainChapter/subChapter/problem/${problem.problemId}`, {
          params: {
            isOptional: !value,
          },
        }).then(response => setIsOptional(prevValue => !prevValue));
      }}>주관식 객관식</CheckBox>
    </div>
  );
};

export default LibraryApp;
