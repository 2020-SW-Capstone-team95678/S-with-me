import React from 'react';
import Text from '../../../common-ui/Text';
import { delimeters } from '../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export function MathTitle(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
        <Text>[입력한 수식 내용]</Text>
      </div>
      <div
        style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
      >
        {props.mathTitle ? (
          <Latex delimiters={delimeters}>{props.mathTitle}</Latex>
        ) : (
          <Text small>입력한 수식 내용이 없습니다.</Text>
        )}
      </div>
    </div>
  );
}

export function MathContent(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
        <Text>[입력한 수식 내용]</Text>
      </div>
      <div
        style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
      >
        {props.mathContent ? (
          <Latex delimiters={delimeters}>{props.mathContent}</Latex>
        ) : (
          <Text small>입력한 수식 내용이 없습니다.</Text>
        )}
      </div>
    </div>
  );
}

  export function MathAnswer(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathAnswer ? (
            <Latex delimiters={delimeters}>{props.mathAnswer}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }

  export function MathSolution(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathSolution ? (
            <Latex delimiters={delimeters}>{props.mathSolution}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }

  export function MathOptionOne(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathOptionOne ? (
            <Latex delimiters={delimeters}>{props.mathOptionOne}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }
  export function MathOptionTwo(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathOptionTwo ? (
            <Latex delimiters={delimeters}>{props.mathOptionTwo}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }
  export function MathOptionThr(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathOptionThr ? (
            <Latex delimiters={delimeters}>{props.mathOptionThr}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }
  export function MathOptionFou(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathOptionFou ? (
            <Latex delimiters={delimeters}>{props.mathOptionFou}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }
  export function MathOptionFiv(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 3, border: '1px solid' }}>
          <Text>[입력한 수식 내용]</Text>
        </div>
        <div
          style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', padding: 3, border: '1px solid' }}
        >
          {props.mathOptionFiv ? (
            <Latex delimiters={delimeters}>{props.mathOptionFiv}</Latex>
          ) : (
            <Text small>입력한 수식 내용이 없습니다.</Text>
          )}
        </div>
      </div>
    );
  }
