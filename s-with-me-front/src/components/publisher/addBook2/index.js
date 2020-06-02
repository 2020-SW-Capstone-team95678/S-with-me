import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import ReactDOM from 'react-dom';

const counterSelector = state => state.counter;

const BookInfoPage = () => {
  const [bookId, setBookId] = useState(null);
  const [mainChapterId, setMainChapterId] = useState(null);

  const [grade, setGrade] = useState(1);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState(0);

  const [mainChapterTitle, setMainChapterTitle] = useState('');
  const [mainChapters, setMainChapters] = useState([]);

  const [subChapterTitle, setSubChapterTitle] = useState('');
  const [subChapters, setSubChapters] = useState([]);

  return (
    <div>
      <div>
        Book infos
        <br />
        <br />
        <h2>book Id : {bookId}</h2>
        Grade
        <input
          type="number"
          value={grade}
          placeholder="please input grade"
          onChange={({ target: { value } }) => setGrade(value)}
        />
        Name
        <input
          type="text"
          value={name}
          placeholder="please input name"
          onChange={({ target: { value } }) => setName(value)}
        />
        Subject
        <input
          type="text"
          value={subject}
          placeholder="please input subject"
          onChange={({ target: { value } }) => setSubject(value)}
        />
        Introduction
        <input type="text" placeholder="please input introduction"></input>
        Price
        <input
          type="number"
          value={price}
          placeholder="please input price"
          onChange={({ target: { value } }) => setPrice(value)}
        ></input>
        <button
          onClick={() => {
            axios
              .post(
                'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085/publisher/library/book',
                {
                  cover: null,
                  grade: grade,
                  name: name,
                  price: price,
                  publisherId: 1,
                  subject: subject,
                },
              )
              .then(response => {
                setBookId(response.data);
              });
          }}
        >
          Save
        </button>
        <button>Cancel</button>
      </div>

      <br />
      <br />
      <div>
        Question
        <br />
        <input
          type="text"
          value={mainChapterTitle}
          placeholder="please mainChapter name"
          onChange={({ target: { value } }) => setMainChapterTitle(value)}
        ></input>
        <button
          onClick={() => {
            axios
              .post(
                'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085/publisher/library/book/mainChapter',
                {
                  bookId: bookId,
                  mainChapterName: mainChapterTitle,
                },
              )
              .then(response => {
                if (response.status === 200) {
                  setMainChapters(oldList => [
                    ...oldList,
                    { id: response.data, title: mainChapterTitle },
                  ]);
                  setMainChapterId(response.data);
                }
              });
          }}
        >
          Add
        </button>
        SubChapter Create
        <input
          placeholder="subchapter"
          type="text"
          onChange={({ target: { value } }) => setSubChapterTitle(value)}
          value={subChapterTitle}
        />
        <button
          onClick={() => {
            //console.log(mainChapter.id + ',' + subChapterTitle);
            axios
              .post(
                'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085/publisher/library/book/mainChapter/subChapter',
                {
                  mainChapterId: mainChapterId,
                  subChapterName: subChapterTitle,
                },
              )
              .then(response => {
                if (response.status === 200) {
                  console.log(response);
                  setSubChapters(oldList => [
                    ...oldList,
                    { mainChapterId: mainChapterId, id: response.data, title: subChapterTitle },
                  ]);
                }
              });

            console.log(subChapters);
          }}
        >
          Add
        </button>
        <Accordion allowZeroExpanded={true}>
          {mainChapters.map(mainChapter => {
            return (
              <MainChapterComponent
                key={mainChapter.id}
                mainChapter={mainChapter}
                onRemoveClick={() => {
                  setMainChapters(oldList =>
                    oldList.filter(target => target.id !== mainChapter.id),
                  );
                }}
              />
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

const MainChapterComponent = ({ mainChapter, onRemoveClick }) => {
  const [subChapterTitle, setSubChapterTitle] = useState('');
  const [subChapters, setSubChapters] = useState([]);
  const onChangeSubChapterTitle = e => {
    setSubChapterTitle(e.target.value);
  };

  return (
    <AccordionItem key={mainChapter.id}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {mainChapter.title}
          <button onClick={onRemoveClick}>remove</button>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div>
          {/* <div>
            SubChapter Create
            <input
              placeholder="subchapter"
              type="text"
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
              value={subChapterTitle}
            />
            <button
              onClick={() => {
                console.log(mainChapter.id + ',' + subChapterTitle);
                axios
                  .post(
                    'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085/publisher/library/book/mainChapter/subChapter',
                    {
                      mainChapterId: mainChapter.id,
                      subChapterName: subChapterTitle,
                    },
                  )
                  .then(response => {
                    if (response.status === 200) {
                      console.log(response);
                      setSubChapters(oldList => [
                        ...oldList,
                        { id: response.data, title: subChapterTitle },
                      ]);
                    }
                  });
              }}
            >
              Add
            </button>
          </div> */}
          <div>
            <SubChapterComponent
              subChapters={subChapters}
              onRemoveClick={clickedId => {
                setSubChapters(oldList => oldList.filter(target => target.id !== clickedId));
              }}
            />
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

// const app = document.getElementById('root');

// ReactDOM.render(<MainChapterComponent />, app);

const SubChapterComponent = ({ subChapters, onRemoveClick }) => {
  return (
    <Accordion>
      {subChapters.map(subChapter => {
        return (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                {subChapter.title}
                <button onClick={() => onRemoveClick(subChapter.id)}>remove</button>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default BookInfoPage;
