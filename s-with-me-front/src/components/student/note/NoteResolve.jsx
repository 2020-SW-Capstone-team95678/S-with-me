import React, { PureComponent } from 'react';

import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Form from '../../../common-ui/Form';

import NewSolutionInputContainer from '../../../containers/student/note/NewSolutionInputContainer';
import NewAnswerInputContainer from '../../../containers/student/note/NewAnswerInputContainer';
import NewScoringButtonContainer from '../../../containers/student/note/NewScoringButtonContainer';
import NoteSolutionFilterContainer from '../../../containers/student/note/NoteSolutionFilterContainer';

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
    const { problemNumber, content, isOptional, answer, title, image } = problem;
    const { noteId, myAnswer, tempSolutionType, myBookId } = note;
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
          {({ onChange, values }) => (
            <VerticalList spacingBetween={2}>
              <div {...css(styles.body)}>
                <Text>
                  {problemNumber ? problemNumber + '.' : null}
                  {title}
                </Text>
                {image ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={image} alt={problemNumber + '문제 그림'} style={{ width: '80%' }} />
                  </div>
                ) : null}
                {content ? (
                  <div style={{ border: '0.5px solid', padding: 2 }}>
                    <Text>{content}</Text>
                  </div>
                ) : null}
                {problemNumber ? (
                  <NewAnswerInputContainer
                    id={noteId}
                    isOptional={isOptional}
                    optionContents={optionContents}
                  />
                ) : null}
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
                  <NoteSolutionFilterContainer id={noteId} />
                </div>
                <NewSolutionInputContainer
                  id={noteId}
                  myBookId={myBookId}
                  onChange={onChange}
                  values={values}
                  solutionType={tempSolutionType}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <NewScoringButtonContainer id={noteId} answer={answer} myAnswer={myAnswer}>
                  {problemNumber ? '새로 채점' : '새 풀이 임시 저장'}
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
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    alignContent: 'flex-start',
    border: '1px solid',
  },
}))(NoteResolve);
