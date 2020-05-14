import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';

import AnswerInput from '../problem/AnswerInput';
import VerticalList from '../../../common-ui/VerticalList';

class ProblemView extends PureComponent {
  render() {
    const { problemNum, content, isOptional, styles } = this.props;
    return (
      <VerticalList spacingBetween={2}>
        <div {...css(styles.body)}>
          <Text>
            {problemNum}.{content}
          </Text>
          <AnswerInput isOptional={isOptional} />
        </div>
        <div {...css(styles.container)}>
          <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
            <Button>내 풀이 보기</Button>
          </div>
          <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
            <Button>해설 보기</Button>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Button>문제 삭제</Button>
          <Button>다시 풀기</Button>
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
    height: 150,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 150,
  },
}))(ProblemView);
