import React from 'react';
import Text from '../../../common-ui/Text';
import { viewLatex } from '../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MyMathSolutionView(props) {
  const { isNewSolution, note } = props;
  const { isMath, tempIsMath } = note;
  if (isMath && !isNewSolution) {
    return (
      <div style={{ paddingBottom: 5, whiteSpace: 'pre-wrap' }}>
        <Text>{note.textSolution}</Text>
      </div>
    );
  } else if (tempIsMath && isNewSolution) {
    return (
      <div style={{ paddingBottom: 5, whiteSpace: 'pre-wrap' }}>
        {viewLatex(note.myNewTextSolution)}
      </div>
    );
  }
}
