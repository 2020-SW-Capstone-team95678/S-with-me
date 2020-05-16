import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

import OldMyAnswer from './OldMyAnswer';

class ProblemView extends PureComponent {
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
    } = this.props;
    return (
      <VerticalList spacingBetween={2}>
        <div {...css(styles.body)}>
          {isRight ? <Text>딩동댕</Text> : <Text>땡!</Text>}
          {isConfused ? <Text>헷갈렸어용</Text> : null}
          <Text>
            {problemNum}.{content}
          </Text>
          <OldMyAnswer isOptional={isOptional} myAnswer={myAnswer} />
        </div>
        <div {...css(styles.container)}>
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
    height: 200,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'flex-end',
    height: 150,
    border: '1px solid',
  },
}))(ProblemView);
