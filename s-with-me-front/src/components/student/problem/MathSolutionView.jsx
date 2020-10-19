import React from 'react';
import { viewLatex } from '../../../constants/delimeters';

export default function MathSolutionView(props) {
  return <div style={{ whiteSpace: 'pre-wrap' }}>{viewLatex(props.solution)}</div>;
}
