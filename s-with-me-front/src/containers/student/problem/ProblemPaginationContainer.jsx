import { connect } from 'react-redux';
import { requestMyProblemList } from '../../../actions/myProblemPackActions';
import ProblemPagination from '../../../components/student/problem/ProblemPagination';

const mapStateToProps = state => {
  const { pagination, ids, loading } = state.myProblemList;
  const { number, size } = pagination;
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
