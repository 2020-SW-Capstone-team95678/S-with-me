import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';

import AnswerInput from './AnswerInput';
import SolutionInput from './SolutionInput';
import SolutionFilter from './SolutionFilter';
import VerticalList from '../../../common-ui/VerticalList';

class ProblemView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isConfused: false };
    this.setConfused = this.setConfused.bind(this);
  }

  setConfused() {
    const { isConfused } = this.state;
    this.setState({ isConfused: !isConfused });
  }

  render() {
    const { problemNum, content, isOptional, styles, solutionType } = this.props;
    const { isConfused } = this.state;
    return (
      <VerticalList spacingBetween={2}>
        <div {...css(styles.body)}>
          <Text>
            {problemNum}.{content}
          </Text>
          <AnswerInput isOptional={isOptional} />
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
          <SolutionInput type={solutionType} />
        </div>
        <div style={{ display: 'flex' }}>
          <CheckBox name="confused" onChange={this.setConfused} checked={isConfused} autoFocus>
            헷갈렸어요
          </CheckBox>
          <Button>개별 채점</Button>
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
