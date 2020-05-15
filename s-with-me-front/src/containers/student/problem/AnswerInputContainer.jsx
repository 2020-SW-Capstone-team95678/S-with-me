import { connect } from 'react-redux';

import { setMyAnswer } from '../../../actions/myProblemActions';
import AnswerInput from '../../../components/student/problem/AnswerInput';

const mapDispatchToProps = dispatch => {
  return {
    setMyAnswer: (id, myAnswer) => dispatch(setMyAnswer(id, myAnswer)),
  };
};

export default connect(null, mapDispatchToProps)(AnswerInput);
