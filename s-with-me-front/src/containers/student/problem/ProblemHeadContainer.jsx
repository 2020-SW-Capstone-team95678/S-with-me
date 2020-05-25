import { connect } from 'react-redux';
import { updateLastProblemId, UPDATE_LAST_PROBLEM_ID } from '../../../actions/myBookPackActions';
import { updateMyProblem, UPDATE_MY_PROBLEM } from '../../../actions/myProblemPackActions';
import { setIsSolved, setIsRight, setSolvedDateTime } from '../../../actions/myProblemActions';
import { setLastMyProblemId } from '../../../actions/myBookActions';
import ProblemHead from '../../../components/student/problem/ProblemHead';

const mapStateToProps = (state, props) => {
  const {
    loadingState: myBookListLoadingState,
    ids: myBookListIds,
    entities: myBookListEntities,
  } = state.myBookList;
  const loadingUpdatePageNumber = myBookListLoadingState[UPDATE_LAST_PROBLEM_ID];
  const myBookList = myBookListIds.map(id => myBookListEntities[id]);
  const myBook = myBookList[myBookListIds.indexOf(props.id * 1)];

  const { ids, entities, loadingState, pagination } = state.myProblemList;
  const loadingUpdateMyProblemList = loadingState[UPDATE_MY_PROBLEM];
  const myProblemList = ids.map(id => entities[id]);

  return {
    loadingUpdatePageNumber,
    loadingUpdateMyProblemList,
    myBook,
    myProblemList,
    pagination,
  };
};

export default connect(mapStateToProps, {
  updateLastProblemId,
  updateMyProblem,
  setIsSolved,
  setIsRight,
  setLastMyProblemId,
  setSolvedDateTime,
})(ProblemHead);
