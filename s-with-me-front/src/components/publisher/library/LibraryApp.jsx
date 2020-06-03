import React, { useState, useEffect } from 'react';
import { CREATE_BOOK } from '../../../constants/modals';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import Button from '../../../common-ui/Button';
import InputBookCover from './InputBookCover';
import Api from '../../../Api';

import 'react-accessible-accordion/dist/fancy-example.css';
import CheckBox from '../../../common-ui/CheckBox';
import { CREATE_MAIN_CHAPTER } from '../../../constants/modals';
import { CREATE_SUB_CHAPTER } from '../../../constants/modals';

const LibraryApp = () => {
  const [books, setBooks] = useState([]);
  const [count, setUpDate] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);

  const onUpDate = () => {
    setUpDate(count + 1);
  };

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
        <Modal>
          {({ openModal }) => (
            <Button primary onPress={() => openModal(CREATE_BOOK, { onUpDate: onUpDate })}>
              추가
            </Button>
          )}
        </Modal>
        <div>
          <ol style={{ overflow: 'hidden', 'overflow-y': 'scroll' }}>
            {books.map(book => {
              return <SideBookInfo book={book} onClick={() => setSelectedBook(book)} />;
            })}
          </ol>
        </div>
      </div>
      <div style={{ flex: 4, padding: 3 }}>
        {(() => {
          if (selectedBook) {
            return <BookInfo book={selectedBook} setBooks={setBooks} />;
          }
        })()}
      </div>
    </div>
  );
};

const SideBookInfo = ({ book, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 5,
        minHeight: 150,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 40,
      }}
    >
      <div
        style={{
          borderRadius: 5,
          padding: 8,
          minHeight: '100%',
          marginTop: 10,
          marginBottom: 10,
        }}
        onClick={onClick}
      >
        <div>
          <img width={100} src={book.cover} alt="bookCover" />
        </div>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            textAlign: 'center',
            marginTop: 3,
            padding: 2,
          }}
        >
          {book.name}
        </div>
      </div>
    </div>
  );
};
export const BookInfo = ({ setData, book, setBooks }) => {
  const [selectedSubChapter, setSelectedSubChapter] = useState(null);

  const [name, setName] = useState(book.name);
  const [cover, setCover] = useState(book.cover);
  const [price, setPrice] = useState(book.price);
  console.log(book.bookId);

  useEffect(() => {
    setName(book.name ? book.name : '');
    setPrice(book.price ? book.price : 0);
    setCover(
      book.cover
        ? book.cover
        : 'https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg',
    );
  }, [book]);

  function handleEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  return (
    <>
      <div>
        <p>북커버</p>
        <img width={100} src={book.cover} alt="bookCover" />
        <InputBookCover setCover={setCover} />
        <button
          primary
          onClick={() => {
            Api.put(`/publisher/library/book/${book.bookId}`, { ...book, cover: cover })
              .then(response =>
                setBooks(prev => {
                  return [...prev, book];
                }),
              )
              .catch(reason => setCover(book.cover));
          }}
        >
          수정
        </button>
      </div>
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
                  .then(response =>
                    setBooks(prev => {
                      return [...prev, book];
                    }),
                  )
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
                  .then(response =>
                    setBooks(prev => {
                      return [...prev, book];
                    }),
                  )
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

        <Modal>
          {({ openModal }) => (
            <Button
              primary
              onPress={() => openModal(CREATE_MAIN_CHAPTER, { type: 'edit', bookId: book.bookId })}
            >
              추가
            </Button>
          )}
        </Modal>
        <div id="main">
          <ChapterInfo
            bookId={book.bookId}
            onClick={subChapterId => {
              setSelectedSubChapter(subChapterId);
            }}
          />
        </div>
        <ProblemInfo subChapterId={selectedSubChapter} />
      </div>
    </>
  );
};

export const ChapterInfo = ({ bookId, onClick }) => {
  const [chapters, setChapters] = useState([]);

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
    <Accordion allowZeroExpanded={true}>
      {chapters.map(chapter => {
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                {chapter.mainChapterResponseDto.mainChapterName}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Modal>
                {({ openModal }) => (
                  <Button
                    primary
                    onPress={() =>
                      openModal(CREATE_SUB_CHAPTER, {
                        mainChapterId: chapter.mainChapterResponseDto.mainChapterId,
                      })
                    }
                  >
                    추가
                  </Button>
                )}
              </Modal>

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
  }, [subChapterId]);

  return (
    <Accordion style={{ marginTop: 20 }} allowZeroExpanded={true}>
      {problems.map(problem => {
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ backgroundColor: 'lightPink' }}>
                {problem.problemNumber}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ProblemItem problem={problem} />
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

// const ProblemInfo = ({ subChapterId }) => {
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await Api.get('/publisher/library/book/mainChapter', {
//         params: {
//           subChapterId: subChapterId,
//         },
//       });

//       setProblems(data.data);
//     };

//     if (subChapterId) {
//       fetchData();
//     }
//   }, [subChapterId]);

//   return (
//     <div>
//       {problems.map(problem => {
//         return <ProblemItem problem={problem} />;
//       })}
//     </div>
//   );
// };

const ProblemItem = ({ problem }) => {
  const [isOptional, setIsOptional] = useState(problem.isOptional);

  console.log(problem);

  return (
    // <div>
    // <p>제목</p>
    //         <input
    //           type="text"
    //           value={name}
    //           onKeyDown={handleEnter}
    //           onChange={e => setName(e.target.value)}
    //           onBlur={e => {
    //             if (e.target.value !== problem.title) {
    //               book.name = name;

    //               Api.put(`/publisher/library/book/mainChapter/subChapter/${problem.problemId}`, book)
    //                 .then(response =>
    //                   setBooks(prev => {
    //                     return [...prev, book];
    //                   }),
    //                 )
    //                 .catch(reason => setName(book.name));
    //             }
    //           }}
    //         ></input>
    //       <div>
    //         <p>북커버</p>
    //         <img width={100} src={book.cover} />
    //         <InputBookCover setCover={setCover} />
    //         <button
    //           primary
    //           onClick={() => {
    //             Api.put(`/publisher/library/book/${book.bookId}`, {
    //               cover: cover,
    //             })
    //               .then(response =>
    //                 setBooks(prev => {
    //                   return [...prev, book];
    //                 }),
    //               )
    //               .catch(reason => setCover(book.cover));
    //           }}
    //         >
    //           수정
    //         </button>
    //       </div>
    //       <div>

    //       </div>
    //       <div>
    //         <p>가격</p>
    //         <input
    //           type="number"
    //           value={price}
    //           onKeyDown={handleEnter}
    //           onChange={e => setPrice(e.target.value)}
    //           onBlur={e => {
    //             if (e.target.value !== book.price) {
    //               book.price = price;

    //               Api.put(`/publisher/library/book/${book.bookId}`, book)
    //                 .then(response =>
    //                   setBooks(prev => {
    //                     return [...prev, book];
    //                   }),
    //                 )
    //                 .catch(reason => setPrice(book.price));
    //             }
    //           }}
    //         ></input>
    //       </div>
    //       <div>
    //         <p>학년</p>
    //         <input value={book.grade}></input>
    //       </div>
    //       <div>
    //         <p>설명</p>
    //         <input value={book.introduction}></input>
    //       </div>

    //       <Modal>
    //         {({ openModal }) => (
    //           <Button
    //             primary
    //             onPress={() => openModal(CREATE_MAIN_CHAPTER, { type: 'edit', bookId: book.bookId })}
    //           >
    //             추가
    //           </Button>
    //         )}
    //       </Modal>
    //       <div id="main">
    //         <ChapterInfo
    //           bookId={book.bookId}
    //           onClick={subChapterId => {
    //             setSelectedSubChapter(subChapterId);
    //           }}
    //         />
    //       </div>
    //       <ProblemInfo subChapterId={selectedSubChapter} />
    //     </div>

    <div>
      <p>{problem.content}</p>
      <p>{problem.solution}</p>
      <p>{problem.answer}</p>
      <CheckBox
        checked={isOptional}
        onChange={(name, value) => {
          console.log(problem.subChapterId);
          Api.put(`/publisher/library/book/mainChapter/subChapter/problem/${problem.problemId}`, {
            params: {
              //subChapterId: problem.subChapterId,
              isOptional: !value,
            },
          }).then(response => setIsOptional(prevValue => !prevValue));
        }}
      >
        주관식 객관식
      </CheckBox>
    </div>
  );
};

export default LibraryApp;
