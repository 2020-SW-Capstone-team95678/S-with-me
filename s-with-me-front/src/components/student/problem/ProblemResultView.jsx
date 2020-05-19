import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

class ProblemResultView extends PureComponent {
  options = [
    { optionNum: 1, optionContent: '1번 보기' },
    { optionNum: 2, optionContent: '2번 보기' },
    { optionNum: 3, optionContent: '3번 보기' },
    { optionNum: 4, optionContent: '4번 보기' },
    { optionNum: 5, optionContent: '5번 보기' },
  ];

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
              {this.options.map((option) => (
                <Text>
                  {option.optionNum} : {option.optionContent}
                </Text>
              ))}
            </VerticalList>
          ) : null}
        </div>
        <div {...css(styles.container)}>
          {isRight ? null : <Text>지난 나의 정답은 {myAnswer} 입니다.</Text>}
          <Text>
            정답은 {answer} {isOptional ? <Text>번</Text> : null} 입니다.
          </Text>
          <div>해설</div>
          <Button>보기</Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Button>문제 저장</Button>
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
