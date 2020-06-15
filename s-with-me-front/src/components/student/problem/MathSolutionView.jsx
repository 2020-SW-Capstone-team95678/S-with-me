import React from 'react';

import { delimeters } from '../../../constants/delimeters';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MathSolutionView(props) {
  return (
    <Latex delimiters={delimeters}>
      {props.solution.replaceAll('\\\\', '\\').replace(/"/g, '')}
    </Latex>
  );
}
