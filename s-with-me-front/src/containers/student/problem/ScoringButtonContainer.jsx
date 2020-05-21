import { connect } from 'react-redux';
import { setSolvedDateTime, setIsRight } from '../../../actions/myProblemActions';
import ScoringButton from '../../../components/student/problem/ScoringButton';
import { setLastMyProblem } from '../../../actions/myBookActions';

const mapDispatchToProps = dispatch => {
  return {
    setSolvedDateTime: (id, solvedDateTime) => dispatch(setSolvedDateTime(id, solvedDateTime)),
    setIsRight: (id, isRight) => dispatch(setIsRight(id, isRight)),
    setLastMyProblem: (id, lastMyProblemId) => dispatch(setLastMyProblem(id, lastMyProblemId)),
  };
};

export default connect(null, mapDispatchToProps)(ScoringButton);
