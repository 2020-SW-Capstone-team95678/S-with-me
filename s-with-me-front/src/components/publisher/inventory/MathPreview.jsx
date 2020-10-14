import React from 'react';
import { delimeters } from '../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { Segment, Message, Icon } from 'semantic-ui-react';

export function MathPreview(props) {
if(props.mathContent){
    return(
    <Segment attached="bottom">
        <Latex delimiters={delimeters}>{props.mathContent}</Latex>
    </Segment>);
} else {
    return(
    <Message attached='bottom' info>
    <Icon name='warning' />
    이 곳에 입력한 수식이 보여집니다.
  </Message> 
    )
}
}