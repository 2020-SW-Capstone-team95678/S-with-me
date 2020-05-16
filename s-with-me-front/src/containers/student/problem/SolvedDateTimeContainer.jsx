import { connect } from 'react-redux';
import { setSolvedDateTime } from '../../../actions/myProblemActions';
import ScoringButton from '../../../components/student/problem/ScoringButton';

const mapDispatchToProps = dispatch => {
  return {
    setSolvedDateTime: (id, solvedDateTime) => dispatch(setSolvedDateTime(id, solvedDateTime)),
  };
};

export default connect(null, mapDispatchToProps)(ScoringButton);
