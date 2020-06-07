import React, { useState } from 'react';
import CheckBox from '../../../../common-ui/CheckBox';
import Button from '../../../../common-ui/Button';
import MathSolutionPreview from './MathSolutionPreview';

export default function TextSolutionInput(props) {
  const [isMath, setIsMathState] = useState(false);
  const [textSolution, setTextSolutionState] = useState('');

  const handleChange = e => {
    const { setSolutionType, id, isNote } = props;
    const { setTextSolution, setMyNewTextSolution } = props;
    e.preventDefault();
    setTextSolutionState(e.target.value);
    if (isNote) setMyNewTextSolution(id, e.target.value);
    else setTextSolution(id, e.target.value);
    setSolutionType(id, 'text');
  };

  const handleMath = e => {
    const { id, setTempIsMath, setIsMath, isNote } = props;
    setIsMathState(!isMath);
    if (isNote) setTempIsMath(id, !isMath);
    else setIsMath(id, !isMath);
  };

  return (
    <div style={{ padding: '5px', paddingTop: 5 }}>
      <div style={{ display: 'flex', border: '1px solid' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CheckBox name="isMath" onChange={handleMath} checked={isMath}>
            수식 입력하기
          </CheckBox>
        </div>
        {isMath ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button small>수식 입력 방법 보러 가기!</Button>
          </div>
        ) : null}
      </div>
      <div style={{ display: 'flex', paddingBottom: 5 }}>
        <textarea
          type="text"
          onChange={handleChange}
          name="textSolutionInput"
          style={{
            width: '100%',
            height: '120px',
            resize: 'none',
          }}
        />
      </div>
      {isMath ? <MathSolutionPreview textSolution={textSolution} /> : null}
    </div>
  );
}
