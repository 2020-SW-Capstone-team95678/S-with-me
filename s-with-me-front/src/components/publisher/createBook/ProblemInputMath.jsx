import React, { useState } from 'react';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import MathInputPreview from './MathInputPreview';

export default function ProblemInputMath(props) {
  const [isMath, setIsMathState] = useState(false);
  const [mathText, setMathText] = useState('');
  const {onContent}=props;

  const handleChange = e => {
    e.preventDefault();
    setMathText(e.target.value);
    onContent(e.target.value);
  };

  const handleMath = e => {
    setIsMathState(!isMath);
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
        <textarea label="문제 내용" 
          type="text"
          onChange={handleChange}
          name="content"
          style={{
            width: '100%',
            height: '120px',
            resize: 'none',
          }}
        />
      </div>
      {isMath ? <MathInputPreview mathText={mathText} /> : null}
    </div>
  );
}
