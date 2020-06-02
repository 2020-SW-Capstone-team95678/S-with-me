import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../../Api';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

const BookInfoPage = (props) => {
  const [bookId, setBookId] = useState(null);

  const [grade, setGrade] = useState(1);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState(0);

  const [mainChapterTitle, setMainChapterTitle] = useState('');
  const [mainChapters, setMainChapters] = useState([]);

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
            Api.post('/publisher/library/book', {
              cover: null,
              grade: grade,
              name: name,
              price: price,
              publisherId: 1,
              subject: subject,
            }).then(response => {
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
            Api.post('/publisher/library/book/mainChapter', {
              bookId: bookId,
              mainChapterName: mainChapterTitle,
            }).then(response => {
              if (response.status === 200) {
                setMainChapters(oldList => [
                  ...oldList,
                  { id: response.data, title: mainChapterTitle },
                ]);
              }
            });
          }}
        >
          Add
        </button>
        <Accordion allowZeroExpanded={true}>
        {mainChapters.map(mainChapter => {
            return (
                <Test/>
            );
          })}
          </Accordion>

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

const Test = () => {
    const [name, setName] = useState("");
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Open and try to write something in the input</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div>
          <input onChange={({ target: { value } }) => setName(value)} value={name} />
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};
const MainChapterComponent = ({ mainChapter, onRemoveClick }) => {
  const [subChapterTitle, setSubChapterTitle] = useState("");
  const [subChapters, setSubChapters] = useState([]);

  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          {mainChapter.title}
          <button onClick={onRemoveClick}>remove</button>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div>
          <div>
            SubChapter Create
            <input
              value={subChapterTitle}
              onChange={({ target: { value } }) => setSubChapterTitle(value)}
            />
            <button
              onClick={() => {
                Api.post('/publisher/library/book/mainChapter/subChapter', {
                  mainChapterId: mainChapter.id,
                  subChapterName: subChapterTitle,
                }).then(response => {
                  setSubChapters(oldList => [
                    ...oldList,
                    { id: response.data, title: subChapterTitle },
                  ]);
                });
              }}
            >
              Add
            </button>
          </div>
          <div>
            <Accordion allowZeroExpanded={true}>
              {subChapters.map(subChapter => {
                return (
                  <SubChapterComponent
                    key={subChapter.id}
                    subChapter={subChapter}
                    onRemoveClick={clickedId => {
                      setSubChapters(oldList => oldList.filter(target => target.id !== clickedId));
                    }}
                  />
                );
              })}
            </Accordion>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const SubChapterComponent = ({ subChapter, onRemoveClick }) => {
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
};

export default BookInfoPage;
