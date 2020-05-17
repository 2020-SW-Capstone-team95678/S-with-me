import { connect } from 'react-redux';
import { setSolvedDateTime, setIsRight } from '../../../actions/myProblemActions';
import ScoringButton from '../../../components/student/problem/ScoringButton';

const mapDispatchToProps = dispatch => {
  return {
    setSolvedDateTime: (id, solvedDateTime) => dispatch(setSolvedDateTime(id, solvedDateTime)),
    setIsRight: (id, isRight) => dispatch(setIsRight(id, isRight)),
  };
};

export default connect(null, mapDispatchToProps)(ScoringButton);
