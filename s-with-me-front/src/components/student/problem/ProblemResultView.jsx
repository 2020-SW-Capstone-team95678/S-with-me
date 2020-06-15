import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_NOTE } from '../../../constants/modals';
import Api from '../../../Api';

import ProblemContentView from './ProblemContentView';
import MathSolutionView from './MathSolutionView';

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
        <div {...css(styles.container)}>
          {showSolution ? (
            <div>
              <div style={{ paddingBottom: '5px' }}>
                {isMath ? <MathSolutionView solution={solution} /> : solution}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onPress={() => this.setState({ showSolution: false })}>돌아 가기</Button>
              </div>
            </div>
          ) : (
            <div>
              {problemNumber ? (
                <div style={{ paddingBottom: '5px' }}>
                  {isRight ? null : (
                    <Text>
                      지난 나의 정답은 {myAnswer}
                      {isOptional ? <Text>번</Text> : null}입니다.
                    </Text>
                  )}
                  <br />
                  <Text>
                    정답은 {answer}
                    {isOptional ? <Text>번</Text> : null} 입니다.
                  </Text>
                </div>
              ) : null}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onPress={() => this.setState({ showSolution: true })}>해설 보기</Button>
              </div>
            </div>
          )}
        </div>
        <Modal>
          {({ openModal }) => (
            <div style={{ display: 'flex' }}>
              {isRight ? (
                <Button
                  onPress={() => {
                    openModal(DELETE_NOTE, { myProblemId: myProblemId });
                    this.setState({ isSavedNote: false });
                  }}
                >
                  오답노트에서 삭제
                </Button>
              ) : null}
              {!isSavedNote && (isRight || !isConfused) ? (
                <Button onPress={() => this.handleSaveProblem(myProblemId)}>문제 저장</Button>
              ) : null}
              {problemNumber ? (
                <Button onPress={() => this.handleResolve(myProblemId)}>다시 풀기</Button>
              ) : null}
            </div>
          )}
        </Modal>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    border: '1px solid',
  },
}))(ProblemResultView);
