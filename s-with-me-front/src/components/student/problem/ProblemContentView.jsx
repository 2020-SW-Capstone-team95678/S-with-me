import React from 'react';

import { Divider, Label, Segment } from 'semantic-ui-react';
import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
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
      <div style={{ padding: 3 }}>
        {isResultView && !isNote ? (
          <Segment>
            {isRight ? (
              <Label color="green" attached="top left" size="medium">
                딩동댕! 정답입니다.
              </Label>
            ) : (
              <Label color="red" attached="top left" size="medium">
                땡! 틀렸습니다.
              </Label>
            )}
            {isConfused ? (
              <Label tag attached="top right" size="medium" color="grey">
                이런! 헷갈렸어요.
              </Label>
            ) : null}
          </Segment>
        ) : null}
        <Segment>
          <Text large>
            {problemNumber ? problemNumber + '.' : null}
            {title}
          </Text>
        </Segment>
      </div>
      <Divider />
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
        <Segment>
          <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
        </Segment>
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
    border: '1px solid',
    padding: 5,
    borderRadius: 2,
  },
}))(ProblemContentView);
