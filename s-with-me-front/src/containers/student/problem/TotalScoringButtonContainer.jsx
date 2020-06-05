import { connect } from 'react-redux';

import { setIsRight, setSolvedDateTime } from '../../../actions/myProblemActions';
import { UPDATE_MY_PROBLEM } from '../../../actions/myProblemPackActions';
import { setLastMyProblemPage } from '../../../actions/myBookActions';
import TotalScoringButton from '../../../components/student/problem/TotalScoringButton';

const mapStateToProps = state => {
  const { loadingState, pagination } = state.myProblemList;
  const loadingUpdateMyProblemList = loadingState[UPDATE_MY_PROBLEM];

  return { loadingUpdateMyProblemList, pagination };
};

export default connect(mapStateToProps, {
  setIsRight,
  setLastMyProblemPage,
  setSolvedDateTime,
})(TotalScoringButton);
