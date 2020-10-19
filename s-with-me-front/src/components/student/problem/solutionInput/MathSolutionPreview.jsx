import React from 'react';
import Text from '../../../../common-ui/Text';
import { viewLatex } from '../../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MathSolutionPreview(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
        <Text>[입력한 수식 내용]</Text>
      </div>
      <div
        style={{
          whiteSpace: 'pre-line',
          wordBreak: 'break-all',
          padding: 3,
          border: '1px solid',
          borderTop: '0px',
        }}
      >
        {props.textSolution ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>{viewLatex(props.textSolution)}</div>
        ) : (
          <Text small>입력한 수식 내용이 없습니다.</Text>
        )}
      </div>
    </div>
  );
}
