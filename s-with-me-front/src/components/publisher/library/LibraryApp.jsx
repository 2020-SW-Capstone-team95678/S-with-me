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
import RegisterProblem from '../createBook/RegisterProblem';

const LibraryApp = () => {
  const [books, setBooks] = useState([]);
  const [count, setUpDate] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const publisherId = window.sessionStorage.getItem('publisherId');

  const onUpDate = () => {
    setUpDate(count + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/publisher/library/book', {
        params: {
          publisherId: publisherId,
        },
      });

      setBooks(data.data);
      setSelectedBook(books[0]);
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: 3, justifyItems: 'center', textAlign: 'center' }}>
        <Modal>
          {({ openModal }) => (
            <Button primary onPress={() => openModal(CREATE_BOOK, { onUpDate: onUpDate, publisherId:publisherId })}>
              Create Book
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
        backgroundColor: 'rgb(255, 245, 238)',
        borderRadius: 5,
        padding: 5,
        minHeight: 150,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 40,
        justifyItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
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
  const [grade, setGrade] = useState(book.grade);
  const [introduction, setIntroduction] = useState(book.introduction);
  console.log(book.bookId);

  useEffect(() => {
    setName(book.name ? book.name : '');
    setPrice(book.price ? book.price : 0);
    // setName(book.introduction ? book.introduction : '');
    // setPrice(book.grade ? book.grade : 0);
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p>북커버</p>
          <img width={100} src={book.cover} alt="non-bookCover" />
          <InputBookCover setCover={setCover} />
          <button
            style={{ cursor: 'point' }}
            primary
            onClick={() => {
              Api.put(`/publisher/library/book/${book.bookId}`, { ...book, cover: cover })
                .then(response =>
                  setBooks(prev => {
                    return [...prev];
                  }),
                )
                .catch(reason => setCover(book.cover));
            }}
          >
            수정
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div>
            <p>제목</p>
            {/* <input
              style={{ flex: 1 }}
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
            ></input> */}

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
                        return [...prev];
                      }),
                    )
                    .catch(reason => setName(book.name));
                }
              }}
            ></input>
          </div>
          <div>
            <p>가격</p>
            {/* <input
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
            ></input> */}
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
                        return [...prev];
                      }),
                    )
                    .catch(reason => setPrice(book.price));
                }
              }}
            ></input>
          </div>
          <div>
            <p>학년</p>
            <input
              type="number"
              value={book.grade}
              // onKeyDown={handleEnter}
              // onChange={e => setGrade(e.target.value)}
              // onBlur={e => {
              //   if (e.target.value !== book.grade) {
              //     book.grade = grade;

              //     Api.put(`/publisher/library/book/${book.bookId}`, book)
              //       .then(response =>
              //         setBooks(prev => {
              //           return [...prev, book];
              //         }),
              //       )
              //       .catch(reason => setGrade(book.grade));
              //   }
              // }}
            ></input>
          </div>
          <div>
            <p>설명</p>
            <input
              type="text"
              value={book.introduction}
              // onKeyDown={handleEnter}
              // onChange={e => setIntroduction(e.target.value)}
              // onBlur={e => {
              //   if (e.target.value !== book.introduction) {
              //     book.introduction = introduction;

              //     Api.put(`/publisher/library/book/${book.bookId}`, book)
              //       .then(response =>
              //         setBooks(prev => {
              //           return [...prev, book];
              //         }),
              //       )
              //       .catch(reason => setIntroduction(book.introduction));
              //   }
              // }}
            ></input>
          </div>
        </div>
      </div>
      <div>
        <Modal>
          {({ openModal }) => (
            <Button
              style={{ cursor: 'point' }}
              primary
              onPress={() => openModal(CREATE_MAIN_CHAPTER, { type: 'edit', bookId: book.bookId })}
            >
              mainChapter add
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
            <AccordionItemPanel style={{ cursor: 'point' }}>
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
                    subChapter add
                  </Button>
                )}
              </Modal>

              <ol>
                {chapter.subChapterResponseDtoList.map(subChapter => {
                  return (
                    <Modal>
                      {({ openModal }) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: 'rgb(255, 245, 238)',
                            paddingLeft: 20,

                            minHeight: 50,
                            cursor: 'point',
                          }}
                          onClick={() => {
                            onClick(subChapter.subChapterId);
                          }}
                        >
                          <br></br>
                          {subChapter.subChapterName}
                          <div style={{ width: 20 }}></div>
                          {/* 
                          <button
                            onPress={() =>
                              openModal(CREATE_PROBLEM, {
                                subChapterId: subChapter.subChapterId,
                              })
                            }
                          >
                            문제 추가
                          </button> */}
                        </div>
                      )}
                    </Modal>
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
  console.log(subChapterId);

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
      <br></br>
      <br></br>
      {/* <Modal>
        {({ openModal }) => (
          <Button
            style={{ cursor: 'point' }}
            onPress={() =>
              openModal(CREATE_PROBLEM, {
                subChapterId: subChapterId,
              })
            }
          >
            problem add
          </Button>
        )}
      </Modal> */}

      <Accordion style={{ marginTop: 20 }} allowZeroExpanded={true}>
        {problems.map(problem => {
          return (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ width: '100%', backgroundColor: 'rgb(247, 207, 192)' }}
                >
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

      <Accordion allowZeroExpanded={true}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>problem add</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <RegisterProblem subChapterId={subChapterId} />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
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
      <p>문제 제목 {problem.title}</p>
      <div style={{ borderWidth: 2, borderColor: 'gray' }}>
        <img width={300} src={problem.image} alt="non-Image" />
      </div>
      <p>문제 내용 {problem.content}</p>
      <p>문제 답 {problem.answer}</p>
      <p>문제 해설{problem.solution}</p>

      {/* <CheckBox
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
      </CheckBox> */}
    </div>
  );
};

export default LibraryApp;
