import React, { useState, useEffect,useRef } from 'react';
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
import { UPDATE_MAIN_CHAPTER } from '../../../constants/modals';
import { UPDATE_PROBLEM } from '../../../constants/modals';
import { CREATE_MAIN_CHAPTER } from '../../../constants/modals';
import { UPDATE_SUB_CHAPTER } from '../../../constants/modals';
import { CREATE_SUB_CHAPTER } from '../../../constants/modals';
import RegisterProblem from '../createBook/RegisterProblem';

const LibraryApp = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const publisherId = window.sessionStorage.getItem('publisherId');

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
                openModal(CREATE_BOOK, {
                  publisherId: publisherId,
                  doneCallback: addedbook => {
                    setBooks(olddata => {
                      return [...olddata, addedbook];
                    });
                  },
                })
              }
            >
              문제집 등록하기
            </Button>
          )}
        </Modal>
        <div>
          <ol style={{ maxHeight: '800px', overflow: 'hidden', overflowY: 'scroll' }}>
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
    <div>
      {book.isOnSale ? (
        <div
          style={{
            backgroundColor: 'rgb(251, 231, 220)',
            borderRadius: 5,
            padding: 5,
            minHeight: 150,
            marginTop: 10,
            marginBottom: 10,
            marginRight: 40,
            justifyItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'solid',
            borderColor: 'gray',
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
      ) : (
        <div
          style={{
            backgroundColor: 'lightgray',
            borderRadius: 5,
            padding: 5,
            minHeight: 150,
            marginTop: 10,
            marginBottom: 10,
            marginRight: 40,
            justifyItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            opacity: 0.3,
          }}
        >
          <div
            style={{
              borderRadius: 5,
              padding: 8,
              minHeight: '100%',
              marginTop: 10,
              marginBottom: 10,
              color: 'red',
            }}
            onClick={onClick}
          >
            <div>
              <img width={100} src={book.cover} alt="bookCover" />
            </div>

            <div
              style={{
                backgroundColor: 'grey',
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
      )}
    </div>
  );
};
export const BookInfo = ({ book, setBooks }) => {
  const [selectedSubChapter, setSelectedSubChapter] = useState(null);
  const [name, setName] = useState(book.name);
  const [cover, setCover] = useState(book.cover);
  const [price, setPrice] = useState(book.price);
  //const [subject,setSubject] = useState(book.subject);
  //const [grade,setGrade] = useState(book.grade);
  const [introduction, setIntroduction] = useState(book.introduction);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    setName(book.name ? book.name : '');
    setIntroduction(book.introduction ? book.introduction : '');
    setPrice(book.price ? book.price : 0);
    setCover(
      book.cover
        ? book.cover
        : 'https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg',
    );
    //setGrade(book.grade ? book.grade : 1);
    //setSubject(book.subject ? book.subject : "국어");
  }, [book]);
  console.log(book.bookId);

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
      Api.put(`/publisher/library/book/${book.bookId}`, book).then(response =>
        setBooks(prev => {
          return [...prev];
        }),
      );
      //.catch(reason => setGrade(book.grade));
    }
  }
  function handleSubjectChange(e) {
    if (e.target.value !== book.subject) {
      //setSubject(e.target.value);
      book.subject = e.target.value;
      Api.put(`/publisher/library/book/${book.bookId}`, book).then(response =>
        setBooks(prev => {
          return [...prev];
        }),
      );
      // .catch(reason => setSubject(book.subject));
    }
  }

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeIntro = e => {
    setIntroduction(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginRight: 50,
          }}
        >
          <p>북커버</p>
          <img width={200} src={book.cover} alt="non-bookCover" />
          <InputBookCover setCover={setCover} />
          <button
            style={{
              cursor: 'point',
              marginRight: 10,
              borderRadius: 10,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 5,
              borderColor: 'lightgray',
              backgroundColor: 'rgb(255, 245, 238)',
            }}
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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <div>제목</div>
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
            <div>가격</div>
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
            <div>학년</div>
            <select value={book.grade} onChange={handleGradeChange}>
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </select>
          </div>
          <div>
            <div>과목</div>
            <select value={book.subject} onChange={handleSubjectChange}>
              <option value="국어">국어</option>
              <option value="수학">수학</option>
              <option value="사회">사회</option>
              <option value="과학">과학</option>
              <option value="영어">영어</option>
              <option value="한국사">한국사</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div style={{ verticalAlign: 'top' }}>
            <div>책소개</div>
            <textarea
              type="text"
              style={{ minHeight: 200, minWidth: 400 }}
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
            ></textarea>
          </div>
        </div>
        <div style={{ marginLeft: 100, marginTop: 50 }}>
          {book.isOnSale ? (
            <button
              style={{
                cursor: 'pointer',
                borderRadius: 3,
                padding: 10,
                margin: 5,
                outline: 'none',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgb(237, 88, 56)',
              }}
              onClick={() => {
                book.isOnSale = !book.isOnSale;
                Api.put(`/publisher/library/book/${book.bookId}`, book).then(response =>
                  setBooks(prev => {
                    return [...prev];
                  }),
                );
              }}
            >
              판매 중단
            </button>
          ) : (
            <button
              style={{
                cursor: 'pointer',
                borderRadius: 3,
                padding: 10,
                margin: 5,
                outline: 'none',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgb(237, 88, 56)',
              }}
              onClick={() => {
                book.isOnSale = !book.isOnSale;
                Api.put(`/publisher/library/book/${book.bookId}`, book).then(response =>
                  setBooks(prev => {
                    return [...prev];
                  }),
                );
              }}
            >
              판매 시작
            </button>
          )}
        </div>
      </div>
      <div>
        <div id="main">
          <ChapterInfo
            bookId={book.bookId}
            prevChapters={chapters}
            onClick={subChapterId => {
              setSelectedSubChapter(subChapterId);
            }}
          />
        </div>
        {/* {selectedSubChapter !== null && (
          <ProblemInfo book={book} setBooks={setBooks} subChapterId={selectedSubChapter} />
        )} */}
      </div>
    </div>
  );
};

export const ChapterInfo = ({ bookId, onClick, prevChapters }) => {
  const [chapters, setChapters] = useState([]);
  const [check,setCheck]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get(`/library/book/${bookId}/chapters`);
      setChapters(data.data);
    };
    if (bookId) {
      fetchData();
    }
  }, [bookId]);
  //setChapters(prevChapters);

  return (
    <div>
      <Modal>
        {({ openModal }) => (
          <>
            <br />
            <button
              style={{
                cursor: 'pointer',
                marginRight: 5,
                marginLeft: 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 10,
                borderColor: 'lightgray',
                borderBottom: 'none',
                backgroundColor: 'rgb(255, 245, 238)',
              }}
              primary
              onClick={() =>
                openModal(CREATE_MAIN_CHAPTER, {
                  type: 'edit',
                  bookId: bookId,
                  chapters,
                  doneCallback: addedmain => {
                    setChapters(olddata => {
                      return [...olddata, addedmain];
                    });
                    console.log(chapters);
                  },
                  //setChapters
                })
              }
            >
              대단원 추가
            </button>
            <button
              style={{
                cursor: 'pointer',
                marginRight: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 10,
                borderColor: 'lightgray',
                borderBottom: 'none',
                backgroundColor: 'rgb(255, 245, 238)',
              }}
              primary
              onClick={() => openModal(UPDATE_MAIN_CHAPTER, { type: 'edit', bookId: bookId })}
            >
              대단원 수정
            </button>
          </>
        )}
      </Modal>
      <Accordion allowZeroExpanded={true}>
        {chapters.map(chapter => {
          const mainChapterId = chapter.mainChapterResponseDto.mainChapterId;
          return (
            <AccordionItem style={{ display: 'flex', cursor: 'pointer', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <AccordionItemHeading
                  style={{ flex: 4, cursor: 'pointer' }}
                  onClick={() => onClick(null)}
                >
                  <AccordionItemButton
                    style={{ button: 'focus', outline: 'none', cursor: 'point' }}
                  >
                    {chapter.mainChapterResponseDto.mainChapterName}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <button
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    border: 'none',
                    '&:hover': {
                      background: '#efefef',
                    },
                  }}
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
              </div>
              
              <SubChapterInfo mainChapterId={mainChapterId} chapter={chapter} check={check} setCheck={setCheck} />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export const SubChapterInfo = ({ mainChapterId, onClick,check,setCheck,chapter, prevChapters }) => {
  const [subChapters, setSubChapters] = useState([]);
  const [subChapterId,setSubChapterId]=useState("");
 // const lastSubChapters=useRef(subChapters);
  const lastSubChapters=useRef("");

  useEffect(() => {
    
  
    const fetchData = async () => {
      const data = await Api.get(`/publisher/library/book/main-chapter/${mainChapterId}/sub-chapters
      `);
      setSubChapters(data.data);
      console.log(data.data);
    };
    

    console.log(mainChapterId);
    if (mainChapterId) {
      fetchData();
    }
  },[mainChapterId,check]);
  console.log(subChapters);
  return (
    
<AccordionItemPanel style={{ cursor: 'pointer' }}>
                <Modal>
                  {({ openModal }) => (
                    <>
                      <button
                        style={{
                          cursor: 'pointer',
                          marginRight: 5,
                          marginLeft: 20,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          padding: 10,
                          borderColor: 'lightgray',
                          borderBottom: 'none',
                          backgroundColor: 'rgb(255, 245, 238)',
                        }}
                        primary
                        onClick={() =>
                          openModal(CREATE_SUB_CHAPTER, {
                            mainChapterId: mainChapterId,
                            setCheck,
                            check,
                            doneCallback: addedsub => {
                              setSubChapters(subChapters => {
                                return [...subChapters, addedsub.subChapterAdd]
                              });
                              lastSubChapters.current=subChapters;
                              console.log(lastSubChapters);
                              console.log(addedsub);
                            },
                            
                          })
                        }
                      >
                        소단원 추가
                      </button>
                      <button
                        style={{
                          cursor: 'pointer',
                          marginRight: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          padding: 10,
                          borderColor: 'lightgray',
                          borderBottom: 'none',
                          backgroundColor: 'rgb(255, 245, 238)',
                        }}
                        primary
                        onClick={() =>
                          openModal(UPDATE_SUB_CHAPTER, {
                            type: 'edit',
                            chapter: chapter,
                            bookId: chapter.bookId,
                          })
                        }
                      >
                        소단원 수정
                      </button>
                    </>
                  )}
                </Modal>
                <div>
                  {   
                  subChapters.map(subChapter => {
                    //etSubChapterId(subChapter.subChapterId);

                    const subChapterId = subChapter.subChapterId;
                    console.log(subChapters);
                    console.log(subChapter);
                    return (
                      <>
                        <div
                          style={{
                            border: 'solid',
                            borderColor: 'rgba(185, 176, 176, 0.87)',
                            borderRadius: 5,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flex: 4,
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'centr',
                                flexDirection: 'row',
                                backgroundColor: 'rgb(255, 245, 238)',
                                paddingLeft: 20,

                                minHeight: 50,
                                cursor: 'pointer',
                              }}
                             
                            >
                              {subChapter.subChapterName}
                            </div>
                            <button
                              style={{ flex: 1, cursor: 'pointer', border: 'none' }}
                              primary
                              onClick={() =>
                                Api.delete(
                                  `/publisher/library/book/main-chapter/sub-chapter/${subChapterId}`,
                                  {
                                    subChapterId,
                                  },
                                ).then(
                                  setSubChapters(prev => {
                                    return [...prev];
                                  }),
                                )
                              }
                            >
                              삭제
                            </button>
                          </div>
                          <ProblemInfo subChapterId={subChapter.subChapterId} />
                        </div>
                        <br></br>
                      </>
                    );
                  })}
               </div>
              </AccordionItemPanel>
  )
}




const ProblemInfo = ({ subChapterId, setBooks }) => {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.get('/publisher/library/book/main-chapter', {
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
      <Accordion allowZeroExpanded={true}>
        {problems.map(problem => {
          return (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton style={{ flex: 1, backgroundColor: 'rgb(247, 207, 192)' }}>
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
            <AccordionItemButton>문제 추가하기</AccordionItemButton>
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
  const problemId = problem.problemId;

  return (
    <div>
      {!problem.isMath ? (
        <div>
          <p>문제 제목 {problem.title}</p>
          <div style={{ borderWidth: 2, borderColor: 'gray' }}>
            <img width={300} src={problem.image} alt="사진이 없습니다." />
          </div>
          <p>문제 내용 {problem.content}</p>
          {problem.isOptional ? (
            <div>
              <p>객관식 1번 {problem.option1}</p>
              <p>객관식 2번 {problem.option2}</p>
              <p>객관식 3번 {problem.option3}</p>
              <p>객관식 4번 {problem.option4}</p>
              <p>객관식 5번 {problem.option5}</p>
            </div>
          ) : null}
          <p>문제 답 {problem.answer}</p>
          <p>문제 해설 {problem.solution}</p>
          <Modal>
            {({ openModal }) => (
              <>
                <br />
                <button
                  style={{ marginRight: 10 }}
                  primary
                  onClick={() =>
                    openModal(UPDATE_PROBLEM, {
                      problem,
                      problemId,
                    })
                  }
                >
                  문제 수정
                </button>
              </>
            )}
          </Modal>
          <button
            style={{ cursor: 'pointer' }}
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
          <Latex delimiters={delimeters}>{JSON.parse(problem.title)}</Latex>
          <div style={{ borderWidth: 2, borderColor: 'gray' }}>
            <img width={300} src={problem.image} alt="사진이 없습니다." />
          </div>
          <p>문제 내용</p>
          <Latex delimiters={delimeters}>{JSON.parse(problem.content)}</Latex>
          {problem.isOptional ? (
            <div>
              <p>객관식 1번 {JSON.parse(problem.option1)}</p>
              <p>객관식 2번 {JSON.parse(problem.option2)}</p>
              <p>객관식 3번 {JSON.parse(problem.option3)}</p>
              <p>객관식 4번 {JSON.parse(problem.option4)}</p>
              <p>객관식 5번 {JSON.parse(problem.option5)}</p>
            </div>
          ) : null}
          <p>
            <Latex delimiters={delimeters}> 문제 답 : {problem.answer}</Latex>
          </p>
          <p>문제 해설</p>
          <Latex delimiters={delimeters}>{JSON.parse(problem.solution)}</Latex>
          <Modal>
            {({ openModal }) => (
              <>
                <br />
                <button
                  style={{ marginRight: 10 }}
                  primary
                  onClick={() =>
                    openModal(UPDATE_PROBLEM, {
                      problem,
                      problemId,
                    })
                  }
                >
                  문제 수정
                </button>
              </>
            )}
          </Modal>
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
