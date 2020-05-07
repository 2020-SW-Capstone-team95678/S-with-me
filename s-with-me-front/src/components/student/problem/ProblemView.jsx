import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import AnswerInput from './AnswerInput';
import SolutionInput from './SolutionInput';
import SolutionFilter from './SolutionFilter';

class ProblemView extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    // problemId: PropTypes.number.isRequired,
    problemNum: PropTypes.number,
    content: PropTypes.string,
    isOptional: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
    solutionType: PropTypes.oneOf(['text', 'hand', 'img', 'link']),
  };

  static defaultProps = {
    isOptional: false,
  };
  render() {
    const { problemNum, content, isOptional, options, styles, solutionType } = this.props;
    return (
      <div {...css(styles.body)}>
        <Text>
          {problemNum}.{content}
        </Text>
        <AnswerInput isOptional={isOptional} options={options} />
        <SolutionFilter />
        <SolutionInput type={solutionType} />
        <CheckBox label="헷갈렸어요" />
        <Button>개별 채점</Button>
      </div>
    );
  }
}

export default withStyles(({ color }) => ({
  body: {
    backgroundColor: '#FFF5EB',
  },
}))(ProblemView);
