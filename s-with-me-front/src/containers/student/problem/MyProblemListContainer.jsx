import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../../actions/myProblemPackActions';
import ProblemList from '../../../components/student/problem/ProblemList';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.myProblemList;
  const loading = loadingState[FETCH_MY_PROBLEM_LIST];
  const myProblemList = ids.map(id => entities[id]);

  return { myProblemList, loading };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
