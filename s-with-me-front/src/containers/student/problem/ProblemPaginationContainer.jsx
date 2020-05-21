import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../../actions/myProblemPackActions';
import ProblemPagination from '../../../components/student/problem/ProblemPagination';

const mapStateToProps = state => {
  const { pagination, ids, loadingState } = state.myProblemList;
  const { number, size } = pagination;
  const loading = loadingState[FETCH_MY_PROBLEM_LIST];
  return {
    pageNumber: number || 1,
    hasNext: ids.length === size,
    loading,
  };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemPagination);
