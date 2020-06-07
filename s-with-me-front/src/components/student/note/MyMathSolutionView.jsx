import React from 'react';
import Text from '../../../common-ui/Text';
import { delimeters } from '../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MyMathSolutionView(props) {
  const { isNewSolution, note } = props;
  const { isMath, tempIsMath } = note;
  if (isMath && !isNewSolution) {
    return (
      <div style={{ paddingBottom: 5 }}>
        <Text>나의 예전 수식 풀이</Text> <br />
        <Text>{note.textSolution}</Text>
      </div>
    );
  } else if (tempIsMath && isNewSolution) {
    return (
      <div style={{ paddingBottom: 5 }}>
        <Text>나의 새 수식 풀이</Text> <br />
        <Latex delimiters={delimeters}>{note.myNewTextSolution}</Latex>
      </div>
    );
  }
}
