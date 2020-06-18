import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Checkbox, Segment, Button } from 'semantic-ui-react';
import Text from '../../../common-ui/Text';
import Api from '../../../Api';

import ProblemContentView from './ProblemContentView';
import MathSolutionView from './MathSolutionView';
import DeleteNoteContainer from '../../../containers/student/note/DeleteNoteContainer';

class ProblemResultView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), isSavedNote: false, showSolution: false };
    this.handleResolve = this.handleResolve.bind(this);
    this.tick = this.tick.bind(this);
    this.handleSaveProblem = this.handleSaveProblem.bind(this);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  handleResolve(myProblemId) {
    const { setIsSolved, setMyAnswer, setIsConfused, setSolutionType } = this.props;
    setIsSolved(myProblemId, false);
    setMyAnswer(myProblemId, null);
    setIsConfused(myProblemId, false);
    setSolutionType(myProblemId, null);
  }
  handleSaveProblem(myProblemId) {
    const formValue = {
      myProblemId: myProblemId,
      addedDateTime: this.state.date.getTime(),
    };
    Api.post('/student/note', formValue).then(() => this.setState({ isSavedNote: true }));
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { myProblemId, isRight, isConfused, myAnswer } = this.props.myProblem;
    const { problemNumber, isOptional, answer, solution, isMath } = this.props.problem;
    const { styles, optionContents } = this.props;
    const { isSavedNote, showSolution } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ProblemContentView
          problem={this.props.problem}
          myProblem={this.props.myProblem}
          optionContents={optionContents}
          isResultView
        />
        <div>
          <Segment compact floated="right">
            <Checkbox
              toggle
              onChange={() =>
                this.setState(prevState => ({ showSolution: !prevState.showSolution }))
              }
              checked={showSolution}
              label={showSolution ? '돌아 가기' : '해설 보기'}
            />
          </Segment>
          {showSolution ? (
            <div {...css(styles.container)}>
              {isMath ? <MathSolutionView solution={solution} /> : solution}
            </div>
          ) : (
            <div {...css(styles.container)}>
              {problemNumber ? (
                <div style={{ paddingBottom: '5px' }}>
                  {isRight ? null : (
                    <Text>
                      지난 나의 정답은 {myAnswer}
                      {isOptional ? <Text>번</Text> : null}입니다. <br />
                    </Text>
                  )}
                  <Text>
                    정답은 {answer}
                    {isOptional ? <Text>번</Text> : null} 입니다. <br />
                    해설을 확인하세요!
                  </Text>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <Button.Group basic size="medium" color="green">
          {!isSavedNote && (isRight || !isConfused) ? (
            <Button
              icon="save"
              onClick={() => this.handleSaveProblem(myProblemId)}
              content="문제 저장"
            />
          ) : null}
          {problemNumber ? (
            <Button
              onClick={() => this.handleResolve(myProblemId)}
              icon="redo"
              content="다시 풀기"
            />
          ) : null}
          {isRight && isSavedNote ? <DeleteNoteContainer myProblemId={myProblemId} /> : null};
        </Button.Group>
      </div>
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
    padding: 5,
    border: '1px solid',
    borderTop: '0px',
  },
}))(ProblemResultView);
