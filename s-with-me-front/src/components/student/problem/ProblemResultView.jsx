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
    this.state = { date: new Date(), isSavedNote: false };
    this.handleResolve = this.handleResolve.bind(this);
    this.tick = this.tick.bind(this);
    this.handleSaveProblem = this.handleSaveProblem.bind(this);
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
    } = this.props;
    const { optionContents } = this.props;
    const { isSavedNote } = this.state;
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
          {isRight ? null : (
            <Text>
              지난 나의 정답은 {myAnswer}
              {isOptional ? <Text>번</Text> : null}입니다.
            </Text>
          )}
          <Text>
            정답은 {answer}
            {isOptional ? <Text>번</Text> : null} 입니다.
          </Text>
          <div>해설</div>
          <Button>보기</Button>
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
    padding: 5,
    justifyContent: 'flex-end',
    height: 150,
    border: '1px solid',
  },
}))(ProblemResultView);
