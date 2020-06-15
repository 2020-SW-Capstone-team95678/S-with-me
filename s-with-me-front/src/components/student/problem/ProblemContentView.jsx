import React from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo } from '@fortawesome/free-solid-svg-icons';
import { withStyles, css } from '../../../common-ui/withStyles';
import AnswerInputContainer from '../../../containers/student/problem/AnswerInputContainer';
import NewAnswerInputContainer from '../../../containers/student/note/NewAnswerInputContainer';
import MathProblemContentView from './MathProblemContentView';

function ProblemContentView(props) {
  const numbers = ['①', '②', '③', '④', '⑤'];
  const { styles, optionContents, isResultView, isNote } = props;
  if (!isNote) {
    var { myProblemId, isRight, isConfused } = props.myProblem;
  }
  const { problemNumber, image, content, title, isOptional, isMath } = props.problem;
  if (isMath) {
    return (
      <MathProblemContentView
        myProblem={props.myProblem}
        note={props.note}
        optionContents={optionContents}
        problem={props.problem}
        isResultView={isResultView}
        isNote={isNote}
      />
    );
  }
  return (
    <div {...css(styles.body)}>
      {isResultView && !isNote ? (
        <div>
          {isRight ? (
            <Text>딩동댕</Text>
          ) : (
            <Text primary>
              <FontAwesomeIcon icon={faPoo} />땡
            </Text>
          )}
          {isConfused ? (
            <Text>
              <br />
              헷갈렸어요
            </Text>
          ) : null}
        </div>
      ) : null}
      <Text large>
        {problemNumber ? problemNumber + '.' : null}
        {title}
      </Text>
      {image ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={image}
            alt={problemNumber + '문제 그림'}
            style={{
              maxHeight: '30vh',
              minHeight: '10vh',
              width: 'auto',
              maxWidth: '100%',
            }}
          />
        </div>
      ) : null}
      {content ? (
        <div style={{ border: '0.5px solid', padding: 2 }}>
          <Text>{content}</Text>
        </div>
      ) : null}
      {isOptional && isResultView ? (
        <VerticalList spacingBetween={1}>
          {optionContents.map((option, index) => (
            <Text key={index}>
              {numbers[index]} : {option}
            </Text>
          ))}
        </VerticalList>
      ) : null}
      {!isResultView && problemNumber && !isNote ? (
        <AnswerInputContainer
          id={myProblemId}
          isOptional={isOptional}
          optionContents={optionContents}
        />
      ) : null}
      {!isResultView && problemNumber && isNote ? (
        <NewAnswerInputContainer
          id={props.note.noteId}
          isOptional={isOptional}
          optionContents={optionContents}
        />
      ) : null}
    </div>
  );
}

export default withStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
    padding: 5,
    borderRadius: 2,
  },
}))(ProblemContentView);
