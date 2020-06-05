import { connect } from 'react-redux';
import { updateMyBook, UPDATE_MY_BOOK } from '../../../actions/myBookPackActions';
import { updateMyProblem } from '../../../actions/myProblemPackActions';
import { setIsSolved } from '../../../actions/myProblemActions';
import ProblemHead from '../../../components/student/problem/ProblemHead';

const mapStateToProps = state => {
  const { loadingState } = state.myBookList;
  const loadingUpdatePageNumber = loadingState[UPDATE_MY_BOOK];

  const { ids, entities, pagination } = state.myProblemList;
  const myProblemList = ids.map(id => entities[id]);

  return { loadingUpdatePageNumber, pagination, myProblemList };
};

export default connect(mapStateToProps, { updateMyBook, updateMyProblem, setIsSolved })(
  ProblemHead,
);
