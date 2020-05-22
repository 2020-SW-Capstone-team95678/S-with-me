import { connect } from 'react-redux';
import { updateLastPageNumber, UPDATE_LAST_PAGE_NUMBER } from '../../../actions/myBookPackActions';
import { updateMyProblem, UPDATE_MY_PROBLEM } from '../../../actions/myProblemPackActions';
import { setIsSolved } from '../../../actions/myProblemActions';
import ProblemHead from '../../../components/student/problem/ProblemHead';

const mapStateToProps = state => {
  const {
    loadingState: myBookListLoadingState,
    ids: myBookListIds,
    entities: myBookListEntities,
  } = state.myBookList;
  const loadingUpdatePageNumber = myBookListLoadingState[UPDATE_LAST_PAGE_NUMBER];
  const myBookList = myBookListIds.map(id => myBookListEntities[id]);

  const { ids, entities, loadingState } = state.myProblemList;
  const loadingUpdateMyProblemList = loadingState[UPDATE_MY_PROBLEM];
  const myProblemList = ids.map(id => entities[id]);

  return {
    loadingUpdatePageNumber,
    loadingUpdateMyProblemList,
    myBookList,
    myProblemList,
  };
};

export default connect(mapStateToProps, { updateLastPageNumber, updateMyProblem, setIsSolved })(
  ProblemHead,
);
