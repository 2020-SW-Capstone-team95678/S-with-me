import React, { useState, useEffect } from 'react';
import { CREATE_BOOK } from '../../../constants/modals';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Latex from 'react-latex-next';
import { delimeters } from '../../../constants/delimeters';

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
import { UPDATE_MAIN_CHAPTER } from '../../../constants/modals';
import { CREATE_MAIN_CHAPTER } from '../../../constants/modals';
import { UPDATE_SUB_CHAPTER } from '../../../constants/modals';
import { CREATE_SUB_CHAPTER } from '../../../constants/modals';
import RegisterProblem from '../createBook/RegisterProblem';
import SelectSubChapter from '../../student/libarary/SelectSubChapter';

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
            <Button
              primary
              onPress={() =>
                openModal(CREATE_BOOK, { onUpDate: onUpDate, publisherId: publisherId })
              }
            >
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
  const [turnOn] = useState(null);
  const [cover, setCover] = useState(book.cover);
  const [price, setPrice] = useState(book.price);
  const [prevSub, setPrevSub] = useState(null);
  const [subject, setSubject] = useState(book.subject);
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

  function handleGradeChange(e) {
    //console.log(book.grade);
    //console.log(e.target.value);
    if (e.target.value !== book.grade) {
      //setGrade(e.target.value);
      book.grade = e.target.value;
      Api.put(`/publisher/library/book/${book.bookId}`, book)
        .then(response =>
          setBooks(prev => {
            return [...prev];
          }),
        )
        .catch(reason => setGrade(book.grade));
      console.log(book.grade);
    }
  }
  function handleSubjectChange(e) {
    if (e.target.value !== book.subject) {
      //setSubject(e.target.value);
      book.subject = e.target.value;
      Api.put(`/publisher/library/book/${book.bookId}`, book)
        .then(response =>
          setBooks(prev => {
            return [...prev];
          }),
        )
        .catch(reason => setSubject(book.subject));
      console.log(book.subject);
    }
  }

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeIntro = e => {
    setIntroduction(e.target.value);
  };

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

            <input
              type="text"
              value={name}
              onKeyDown={handleEnter}
              onChange={onChangeName}
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
            <select defaultValue={book.grade} onChange={handleGradeChange}>
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </select>
          </div>
          <div>
            <p>과목</p>
            <select defaultValue={book.subject} onChange={handleSubjectChange}>
              <option value="국어">국어</option>
              <option value="수학">수학</option>
              <option value="사회">사회</option>
              <option value="과학">과학</option>
            </select>
          </div>
          <div>
            <p>설명</p>
            <input
              type="text"
              name="introduction"
              value={introduction}
              onKeyDown={handleEnter}
              onChange={onChangeIntro}
              onBlur={e => {
                if (e.target.value !== book.introduction) {
                  book.introduction = introduction;

                  Api.put(`/publisher/library/book/${book.bookId}`, book)
                    .then(response =>
                      setBooks(prev => {
                        return [...prev];
                      }),
                    )
                    .catch(reason => setIntroduction(book.introduction));
                }
              }}
            ></input>
          </div>
        </div>
      </div>
      <div>
        <Modal>
          {({ openModal }) => (
            <>
              <br />
              <button
                style={{ cursor: 'point', marginRight: 10 }}
                primary
                onClick={() =>
                  openModal(CREATE_MAIN_CHAPTER, { type: 'edit', bookId: book.bookId })
                }
              >
                mainChapter add
              </button>
              <button
                style={{ cursor: 'point' }}
                primary
                onClick={() =>
                  openModal(UPDATE_MAIN_CHAPTER, { type: 'edit', bookId: book.bookId })
                }
              >
                mainChapter rename
              </button>
            </>
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
        {selectedSubChapter !== null && (
          <ProblemInfo book={book} setBooks={setBooks} subChapterId={selectedSubChapter} />
        )}
      </div>
    </>
  );
};

export const ChapterInfo = ({ bookId, onClick }) => {
  const [chapters, setChapters] = useState([]);
  const [mainChapterName, setMainChapterName] = useState([]);

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
        const mainChapterId = chapter.mainChapterResponseDto.mainChapterId;
        return (
          <AccordionItem style={{ display: 'flex', cursor: 'point', }}>
            <AccordionItemHeading
              style={{ flex:4, cursor: 'point', flexDirection: 'row' }}
              onClick={() => onClick(null)}
            >
              <AccordionItemButton style={{  cursor: 'point' }}>
                {chapter.mainChapterResponseDto.mainChapterName}
              </AccordionItemButton>
            </AccordionItemHeading>
            <button
              style={{ flex: 1, cursor: 'point' }}
              primary
              onClick={() =>
                Api.delete(`/publisher/library/book/main-chapter/${mainChapterId}`, {
                  mainChapterId,
                }).then(
                  setChapters(prev => {
                    return [...prev];
                  }),
                )
              }
            >
              삭제
            </button>
            <AccordionItemPanel style={{ cursor: 'point' }}>
              <Modal>
                {({ openModal }) => (
                  <>
                    <button
                      style={{ marginRight: 10 }}
                      primary
                      onClick={() =>
                        openModal(CREATE_SUB_CHAPTER, {
                          mainChapterId: chapter.mainChapterResponseDto.mainChapterId,
                        })
                      }
                    >
                      subChapter add
                    </button>
                    <button
                      style={{ cursor: 'point' }}
                      primary
                      onClick={() =>
                        openModal(UPDATE_SUB_CHAPTER, {
                          type: 'edit',
                          chapter: chapter,
                          bookId: bookId,
                        })
                      }
                    >
                      subChapter rename
                    </button>
                  </>
                )}
              </Modal>

              <ol>
                {chapter.subChapterResponseDtoList.map(subChapter => {
                  const subChapterId = subChapter.subChapterId;
                  return (
                    <Modal>
                      {({ openModal }) => (
                        <div
                          style={{
                            display: 'flex',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flex: 4,

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
                          </div>
                          <button
                            style={{ flex: 1, cursor: 'point' }}
                            primary
                            onClick={() =>
                              Api.delete(
                                `/publisher/library/book/main-chapter/sub-chapter/${subChapterId}`,
                                {
                                  subChapterId,
                                },
                              ).then(
                                setChapters(prev => {
                                  return [...prev];
                                }),
                              )
                            }
                          >
                            삭제
                          </button>
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

const ProblemInfo = ({ subChapterId, setBooks }) => {
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
                <ProblemItem setBooks={setBooks} problem={problem} />
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

const ProblemItem = ({ problem, setBooks }) => {
  console.log(problem.isMath);
  const problemId = problem.problemId;
  console.log(problemId);

  return (
    <div>
      {!problem.isMath ? (
        <div>
          <p>문제 제목 {problem.title}</p>
          <div style={{ borderWidth: 2, borderColor: 'gray' }}>
            <img width={300} src={problem.image} alt="non-Image" />
          </div>
          <p>문제 내용 {problem.content}</p>
          <p>문제 답 {problem.answer}</p>
          <p>문제 해설{problem.solution}</p>
          <Modal>
            {({ openModal }) => (
              <>
                <br />
                <button>문제 수정</button>
              </>
            )}
          </Modal>
          <button
            style={{ cursor: 'point' }}
            primary
            onClick={() =>
              Api.delete(`/publisher/library/book/main-chapter/sub-chapter/problem/${problemId}`, {
                problemId,
              }).then(
                setBooks(prev => {
                  return [...prev];
                }),
              )
            }
          >
            문제 삭제
          </button>
        </div>
      ) : (
        <div>
          <p>문제 제목 </p>
          <Latex delimiters={delimeters}>{problem.title}</Latex>
          <div style={{ borderWidth: 2, borderColor: 'gray' }}>
            <img width={300} src={problem.image} alt="non-Image" />
          </div>
          <p>문제 내용</p>
          <Latex delimiters={delimeters}>{problem.content}</Latex>
          <p>문제 답 </p>
          <Latex delimiters={delimeters}>{problem.answer}</Latex>
          <p>문제 해설</p>
          <Latex delimiters={delimeters}>{problem.solution}</Latex>
          <button
            style={{ cursor: 'point' }}
            primary
            onClick={() =>
              Api.delete(`/publisher/library/book/main-chapter/sub-chapter/problem/${problemId}`, {
                problemId,
              }).then(response =>
                setBooks(prev => {
                  return [...prev];
                }),
              )
            }
          >
            문제 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default LibraryApp;
