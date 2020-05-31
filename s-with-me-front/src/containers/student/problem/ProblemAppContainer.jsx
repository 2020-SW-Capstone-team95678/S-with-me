import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../../actions/myProblemPackActions';
import ProblemApp from '../../../components/student/problem/ProblemApp';

const mapStateToProps = state => {
  const { ids, entities, pagination, loadingState } = state.myProblemList;
  const loading = loadingState[FETCH_MY_PROBLEM_LIST];
  const myProblemList = ids.map(id => entities[id]);
  const { number } = pagination;

  return { myProblemList, loading, number };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemApp);
