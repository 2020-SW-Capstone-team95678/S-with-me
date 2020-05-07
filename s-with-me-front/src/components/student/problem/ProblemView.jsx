import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import AnswerInput from './AnswerInput';

class ProblemView extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    id: PropTypes.number.isRequired,
    problemNum: PropTypes.number,
    content: PropTypes.string,
    isOptional: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    isOptional: false,
  };
  render() {
    const { id, problemNum, content, isOptional, options, styles } = this.props;
    return (
      <div {...css(styles.body)}>
        <Text>
          {problemNum}.{content}
        </Text>
        <AnswerInput id={id} isOptional={isOptional} options={options} />
      </div>
    );
  }
}

export default withStyles(({ color }) => ({
  body: {
    backgroundColor: '#FFF5EB',
  },
}))(ProblemView);
