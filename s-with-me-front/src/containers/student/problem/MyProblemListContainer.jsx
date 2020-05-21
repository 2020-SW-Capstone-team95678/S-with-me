import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../../actions/myProblemPackActions';
import ProblemList from '../../../components/student/problem/ProblemList';

const mapStateToProps = state => {
  const { pagination, ids, entities, loadingState } = state.myProblemList;
  const loading = loadingState[FETCH_MY_PROBLEM_LIST];
  const { number } = pagination;
  const myProblemList = ids.map(id => entities[id]);

  return { myProblemList, loading, number };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
