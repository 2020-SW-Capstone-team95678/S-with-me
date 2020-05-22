import { connect } from 'react-redux';
import { setSolvedDateTime, setIsRight } from '../../../actions/myProblemActions';
import ScoringButton from '../../../components/student/problem/ScoringButton';
import { setLastMyProblemPage } from '../../../actions/myBookActions';

const mapDispatchToProps = dispatch => {
  return {
    setSolvedDateTime: (id, solvedDateTime) => dispatch(setSolvedDateTime(id, solvedDateTime)),
    setIsRight: (id, isRight) => dispatch(setIsRight(id, isRight)),
    setLastMyProblemPage: (id, lastPageNumber) =>
      dispatch(setLastMyProblemPage(id, lastPageNumber)),
  };
};

export default connect(null, mapDispatchToProps)(ScoringButton);
