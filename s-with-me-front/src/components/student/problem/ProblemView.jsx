import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import InlineList from '../../../common-ui/InlineList';

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
        <Text>
          {problemNum}.{content}
        </Text>
        <AnswerInput isOptional={isOptional} />
        <SolutionFilter />
        <SolutionInput type={solutionType} />
        <CheckBox name="confused" onChange={this.setConfused} checked={isConfused} autoFocus>
          헷갈렸어요
        </CheckBox>
        <Button>개별 채점</Button>
      </VerticalList>
    );
  }
}

export default withStyles(({ unit, color }) => ({
  body: {
    backgroundColor: '#FFF5EB',
  },
}))(ProblemView);
