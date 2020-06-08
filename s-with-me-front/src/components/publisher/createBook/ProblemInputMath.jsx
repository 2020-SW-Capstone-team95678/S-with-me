import React, { useState } from 'react';
import { MathContent, MathTitle, MathAnswer, MathOptionOne, MathOptionTwo, MathOptionThr, MathOptionFou,MathOptionFiv, MathSolution } from './MathInputPreview';

export function ProblemInputMathTop(props) {
  //const [isMath, setIsMathState] = useState(false);
  const [mathContent, setMathContent] = useState('');
  const [mathTitle, setMathTitle] = useState('');

  const { prevTitle,prevContent,onTitle, onContent, isMath } = props;

  const handleTitleChange = e => {
    setMathTitle(e.target.value);
    onTitle(e.target.value);
  };

  const handleContentChange = e => {
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
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathSolution, setMathSolution] = useState('');
  const [mathOptionOne, setMathOptionOne] = useState('');
  const [mathOptionTwo, setMathOptionTwo] = useState('');
  const [mathOptionThr, setMathOptionThr] = useState('');
  const [mathOptionFou, setMathOptionFou] = useState('');
  const [mathOptionFiv, setMathOptionFiv] = useState('');
  const { onAnswer,onSolution,onOptionOne,onOptiontwo, onOptionthr,onOptionFou,onOptionFiv, isMath, isOptional } = props;

  const handleAnswerChange = e => {
    e.preventDefault();
    setMathAnswer(e.target.value);
    onAnswer(e.target.value);
  };

  const handleSolutionChange = e => {
    e.preventDefault();
    setMathSolution(e.target.value);
    onSolution(e.target.value);
  };

  const handleOptionOneChange = e => {
    e.preventDefault();
    setMathOptionOne(e.target.value);
    onOptionOne(e.target.value);
  };
  const handleOptionTwoChange = e => {
    e.preventDefault();
    setMathOptionTwo(e.target.value);
    onOptiontwo(e.target.value);
  };
  const handleOptionThrChange = e => {
    e.preventDefault();
    setMathOptionThr(e.target.value);
    onOptionthr(e.target.value);
  };
  const handleOptionFouChange = e => {
    e.preventDefault();
    setMathOptionFou(e.target.value);
    onOptionFou(e.target.value);
  };
  const handleOptionFivChange = e => {
    e.preventDefault();
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
            label="문제 제목"
            type="text"
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
