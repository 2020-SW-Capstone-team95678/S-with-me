import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_NOTE } from '../../../constants/modals';
import Api from '../../../Api';

class ProblemResultView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), isSavedNote: false, showSolution: false };
    this.handleResolve = this.handleResolve.bind(this);
    this.tick = this.tick.bind(this);
    this.handleSaveProblem = this.handleSaveProblem.bind(this);
    this.handleViewSolution = this.handleViewSolution.bind(this);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  handleResolve(myProblemId) {
    const { setIsSolved, setMyAnswer } = this.props;
    setIsSolved(myProblemId, false);
    setMyAnswer(myProblemId, null);
  }
  handleSaveProblem(myProblemId) {
    const formValue = {
      myProblemId: myProblemId,
      addedDateTime: this.state.date.getTime(),
    };
    Api.post('/student/note', formValue).then(() => this.setState({ isSavedNote: true }));
  }
  handleViewSolution() {
    this.setState({ showSolution: true });
  }

  componentDidMount() {
    clearInterval(this.timerId);
  }
  render() {
    const {
      problemNum,
      content,
      isOptional,
      styles,
      myProblemId,
      isRight,
      isConfused,
      myAnswer,
      answer,
      solution,
    } = this.props;
    const { optionContents } = this.props;
    const { isSavedNote, showSolution } = this.state;
    return (
      <VerticalList spacingBetween={2}>
        <div {...css(styles.body)}>
          {isRight ? <Text>딩동댕</Text> : <Text>땡!</Text>}
          {isConfused ? <Text>헷갈렸어요!!</Text> : null}
          <Text>
            {problemNum}.{content}
          </Text>
          {isOptional ? (
            <VerticalList spacingBetween={1}>
              {optionContents.map((option, index) => (
                <Text>
                  {index + 1} : {option}
                </Text>
              ))}
            </VerticalList>
          ) : null}
        </div>
        <div {...css(styles.container)}>
          {showSolution ? (
            <div>{solution}</div>
          ) : (
            <div>
              <div>
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onPress={() => this.handleViewSolution()}>해설 보기</Button>
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
              <Button onPress={() => this.handleResolve(myProblemId)}>다시 풀기</Button>
            </div>
          )}
        </Modal>
      </VerticalList>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    height: 150,
    border: '1px solid',
  },
}))(ProblemResultView);
