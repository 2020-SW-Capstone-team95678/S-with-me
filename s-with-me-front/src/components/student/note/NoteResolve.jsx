import React, { PureComponent } from 'react';

import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Form from '../../../common-ui/Form';

import SolutionFilter from '../problem/SolutionFilter';
import NewSolutionInputContainer from '../../../containers/student/note/NewSolutionInputContainer';
import NewAnswerInputContainer from '../../../containers/student/note/NewAnswerInputContainer';
import NewScoringButtonContainer from '../../../containers/student/note/NewScoringButtonContainer';

class NoteResolve extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { note, setResolve } = this.props;
    setResolve(note.noteId, 'COMPLETE');
  }

  render() {
    const { problem, note, styles } = this.props;
    const { problemNum, content, isOptional, answer } = problem;
    const { noteId, myAnswer } = note;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(problem.option1);
      optionContents.push(problem.option2);
      optionContents.push(problem.option3);
      optionContents.push(problem.option4);
      optionContents.push(problem.option5);
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Consumer>
          {() => (
            <VerticalList spacingBetween={2}>
              <div {...css(styles.body)}>
                <Text>
                  {problemNum}.{content}
                </Text>
                <NewAnswerInputContainer
                  id={noteId}
                  isOptional={isOptional}
                  optionContents={optionContents}
                />
              </div>
              <div {...css(styles.container)}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 3,
                    border: '1px solid',
                  }}
                >
                  <SolutionFilter />
                </div>
                <NewSolutionInputContainer id={noteId} />
              </div>
              <div style={{ display: 'flex' }}>
                <NewScoringButtonContainer id={noteId} answer={answer} myAnswer={myAnswer}>
                  새로 채점
                </NewScoringButtonContainer>
              </div>
            </VerticalList>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}

export default withStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
    padding: 5,
    height: 150,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    alignContent: 'flex-start',
    height: 150,
    border: '1px solid',
  },
}))(NoteResolve);
