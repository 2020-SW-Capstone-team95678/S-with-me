import { connect } from 'react-redux';
import { updateMyBook, UPDATE_MY_BOOK } from '../../../actions/myBookPackActions';
import { updateMyProblem, UPDATE_MY_PROBLEM } from '../../../actions/myProblemPackActions';
import { setIsSolved, setIsRight, setSolvedDateTime } from '../../../actions/myProblemActions';
import { setLastMyProblemPage } from '../../../actions/myBookActions';
import ProblemHead from '../../../components/student/problem/ProblemHead';

const mapStateToProps = (state, props) => {
  const {
    loadingState: myBookListLoadingState,
    ids: myBookListIds,
    entities: myBookListEntities,
  } = state.myBookList;
  const loadingUpdatePageNumber = myBookListLoadingState[UPDATE_MY_BOOK];
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
  updateMyBook,
  updateMyProblem,
  setIsSolved,
  setIsRight,
  setLastMyProblemPage,
  setSolvedDateTime,
})(ProblemHead);
