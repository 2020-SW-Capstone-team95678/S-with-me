import React, { useState } from 'react';
import { MathContent, MathTitle, MathAnswer, MathOptionOne, MathOptionTwo, MathOptionThr, MathOptionFou,MathOptionFiv, MathSolution } from './MathInputPreview';

export function ProblemInputMathTop(props) {
  //const [isMath, setIsMathState] = useState(false);
  
  const { prevTitle,prevContent,onTitle, onContent, isMath } = props;
  const [title,setTitle] = useState(prevTitle);
  const [mathTitle, setMathTitle] = useState(prevTitle);

  const [content,setContent] = useState(prevContent);
  const [mathContent, setMathContent] = useState(prevContent);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    setMathTitle(e.target.value);
    onTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
    setMathContent(e.target.value);
    onContent(e.target.value);
  };

  return (
    <div style={{ padding: '5px', paddingTop: 5 }}>
      <div>
        {' '}
        문제 제목
        <div style={{ display: 'flex', paddingBottom: 5 }}>
          <input
            label="문제 제목"
            type="text"
            value={title}
            onChange={handleTitleChange}
            name="title"
            style={{
              width: '100%',
              height: '30px',
              resize: 'none',
            }}
          />
        </div>
        {isMath ? <MathTitle mathTitle={mathTitle} /> : null}
      </div>
      <br />
      <div>
        {' '}
        문제 내용
        <div style={{ display: 'flex', paddingBottom: 5 }}>
          <textarea
            label="문제 내용"
            type="text"
            value={content}
            onChange={handleContentChange}
            name="content"
            style={{
              width: '100%',
              height: '120px',
              resize: 'none',
            }}
          />
        </div>
        {isMath ? <MathContent mathContent={mathContent} /> : null}
      </div>
    </div>
  );
}

export function ProblemInputMathBottom(props) {
  //const [isMath, setIsMathState] = useState(false);

  const {prevAnswer,prevSolution,PrevOptionOne, prevOptionTwo, prevOptionThr,prevOptionFou,prevOptionFiv
    ,onAnswer,onSolution,onOptionOne,onOptionTwo, onOptionThr,onOptionFou,onOptionFiv, isMath, isOptional } = props;

  const [mathAnswer, setMathAnswer] = useState(prevAnswer);
  const [mathSolution, setMathSolution] = useState(prevSolution);
  const [mathOptionOne, setMathOptionOne] = useState(PrevOptionOne);
  const [mathOptionTwo, setMathOptionTwo] = useState(prevOptionTwo);
  const [mathOptionThr, setMathOptionThr] = useState(prevOptionThr);
  const [mathOptionFou, setMathOptionFou] = useState(prevOptionFou);
  const [mathOptionFiv, setMathOptionFiv] = useState(prevOptionFiv);
  const [answer, setAnswer] = useState(prevAnswer);
  const [solution, setSolution] = useState(prevSolution);
  const [optionOne, setOptionOne] = useState(PrevOptionOne);
  const [optionTwo, setOptionTwo] = useState(prevOptionTwo);
  const [optionThr, setOptionThr] = useState(prevOptionThr);
  const [optionFou, setOptionFou] = useState(prevOptionFou);
  const [optionFiv, setOptionFiv] = useState(prevOptionFiv);

  
  const handleAnswerChange = e => {
    setMathAnswer(e.target.value);
    setAnswer(e.target.value);
    onAnswer(e.target.value);
  };

  const handleSolutionChange = e => {
    setSolution(e.target.value);
    setMathSolution(e.target.value);
    onSolution(e.target.value);
  };

  const handleOptionOneChange = e => {
    setOptionOne(e.target.value);
    setMathOptionOne(e.target.value);
    onOptionOne(e.target.value);
  };
  const handleOptionTwoChange = e => {
    setOptionTwo(e.target.value);
    setMathOptionTwo(e.target.value);
    onOptionTwo(e.target.value);
  };
  const handleOptionThrChange = e => {
    setOptionThr(e.target.value);
    setMathOptionThr(e.target.value);
    onOptionThr(e.target.value);
  };
  const handleOptionFouChange = e => {
    setOptionFou(e.target.value);
    setMathOptionFou(e.target.value);
    onOptionFou(e.target.value);
  };
  const handleOptionFivChange = e => {
    setOptionFiv(e.target.value);
    setMathOptionFiv(e.target.value);
    onOptionFiv(e.target.value);
  };

  return (
    <div style={{ padding: '5px', paddingTop: 5 }}>
      {isOptional ? (
        <div>
          <div>
            {' '}
            객관식 1번
            <div style={{ display: 'flex', paddingBottom: 5 }}>
              <input
                label="객관식 1번"
                type="text"
                value={optionOne}
                onChange={handleOptionOneChange}
                name="title"
                style={{
                  width: '100%',
                  height: '20px',
                  resize: 'none',
                }}
              />
            </div>
            {isMath ? <MathOptionOne mathOptionOne={mathOptionOne} /> : null}
          </div>
          <div>
            {' '}
            객관식 2번
            <div style={{ display: 'flex', paddingBottom: 5 }}>
              <input
                label="객관식 2번"
                type="text"
                value={optionTwo}
                onChange={handleOptionTwoChange}
                name="title"
                style={{
                  width: '100%',
                  height: '20px',
                  resize: 'none',
                }}
              />
            </div>
            {isMath ? <MathOptionTwo mathOptionTwo={mathOptionTwo} /> : null}
          </div>
          <div>
            {' '}
            객관식 3번
            <div style={{ display: 'flex', paddingBottom: 5 }}>
              <input
                label="객관식 3번"
                type="text"
                value={optionThr}
                onChange={handleOptionThrChange}
                name="title"
                style={{
                  width: '100%',
                  height: '20px',
                  resize: 'none',
                }}
              />
            </div>
            {isMath ? <MathOptionThr mathOptionThr={mathOptionThr} /> : null}
          </div>
          <div>
            {' '}
            객관식 4번
            <div style={{ display: 'flex', paddingBottom: 5 }}>
              <input
                label="객관식 4번"
                type="text"
                value={optionFou}
                onChange={handleOptionFouChange}
                name="title"
                style={{
                  width: '100%',
                  height: '20px',
                  resize: 'none',
                }}
              />
            </div>
            {isMath ? <MathOptionFou mathOptionFou={mathOptionFou} /> : null}
          </div>
          <div>
            {' '}
            객관식 5번
            <div style={{ display: 'flex', paddingBottom: 5 }}>
              <input
                label="객관식 5번"
                type="text"
                value={optionFiv}
                onChange={handleOptionFivChange}
                name="title"
                style={{
                  width: '100%',
                  height: '20px',
                  resize: 'none',
                }}
              />
            </div>
            {isMath ? <MathOptionFiv mathOptionFiv={mathOptionFiv} /> : null}
          </div>
        </div>
      ) : null}
      <div>
        {' '}
        문제 정답
        <div style={{ display: 'flex', paddingBottom: 5 }}>
          <input
            label="문제 정답"
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            name="title"
            style={{
              width: '100%',
              height: '30px',
              resize: 'none',
            }}
          />
        </div>
        {isMath ? <MathAnswer mathAnswer={mathAnswer} /> : null}
      </div>
      <br />
      <div>
        {' '}
        문제 해설
        <div style={{ display: 'flex', paddingBottom: 5 }}>
          <textarea
            label="문제 내용"
            type="text"
            value={solution}
            onChange={handleSolutionChange}
            name="content"
            style={{
              width: '100%',
              height: '120px',
              resize: 'none',
            }}
          />
        </div>
        {isMath ? <MathSolution mathSolution={mathSolution} /> : null}
      </div>
      <br />
    </div>
  );
}
