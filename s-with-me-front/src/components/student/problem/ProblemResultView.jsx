import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

class ProblemResultView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleResolve = this.handleResolve.bind(this);
  }
  handleResolve(myProblemId) {
    const { setIsSolved, setMyAnswer } = this.props;
    setIsSolved(myProblemId, false);
    setMyAnswer(myProblemId, null);
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
        <div style={{ display: 'flex' }}>
          <Button>문제 저장</Button>
          <Button onPress={() => this.handleResolve(myProblemId)}>다시 풀기</Button>
        </div>
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
