import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';

import SolutionFilter from './SolutionFilter';

import AnswerInputContainer from '../../../containers/student/problem/AnswerInputContainer';
import IsConfusedContainer from '../../../containers/student/problem/IsConfusedContainer';
import SolutionInputContainer from '../../../containers/student/problem/SolutionInputContainer';
import ScoringButtonContainer from '../../../containers/student/problem/ScoringButtonContainer';

class ProblemView extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { problemNum, content, isOptional, styles, myProblemId, answer, myAnswer } = this.props;
    return (
      <VerticalList spacingBetween={2}>
        <div {...css(styles.body)}>
          <Text>
            {problemNum}.{content}
          </Text>
          <AnswerInputContainer id={myProblemId} isOptional={isOptional} />
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
          <SolutionInputContainer id={myProblemId} />
        </div>
        <div style={{ display: 'flex' }}>
          <IsConfusedContainer id={myProblemId} />
          <ScoringButtonContainer id={myProblemId} answer={answer} myAnswer={myAnswer}>
            개별 채점
          </ScoringButtonContainer>
        </div>
      </VerticalList>
    );
  }
}

export default withStyles(({ unit, color }) => ({
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
}))(ProblemView);
