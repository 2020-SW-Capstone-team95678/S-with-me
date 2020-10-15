import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

export const delimeters = [
  { left: '$$', right: '$$', display: true },
  { left: '\\(', right: '\\)', display: false },
  { left: '$', right: '$', display: false },
  { left: '\\[', right: '\\]', display: true },
];

export const parseLatex = (latexStr) => {
  return latexStr ? JSON.parse(latexStr) : latexStr;
};

export const viewLatex = (latexStr) => {
  return latexStr ? <Latex delimiters={delimeters}>{JSON.parse(latexStr)}</Latex> : latexStr;
};
