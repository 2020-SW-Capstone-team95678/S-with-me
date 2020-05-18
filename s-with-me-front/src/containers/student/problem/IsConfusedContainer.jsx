import { connect } from 'react-redux';

import { setIsConfused } from '../../../actions/myProblemActions';
import IsConfusedInput from '../../../components/student/problem/IsConfusedInput';

const mapDispatchToProps = dispatch => {
  return {
    setIsConfused: (id, isConfused) => dispatch(setIsConfused(id, isConfused)),
  };
};

export default connect(null, mapDispatchToProps)(IsConfusedInput);
