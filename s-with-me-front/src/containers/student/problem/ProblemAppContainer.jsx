import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../../actions/myProblemPackActions';
import ProblemApp from '../../../components/student/problem/ProblemApp';

const mapStateToProps = state => {
  const { ids, entities, pagination, loadingState } = state.myProblemList;
  const loading = loadingState[FETCH_MY_PROBLEM_LIST];
  const myProblemList = ids.map(id => entities[id]);
  const { number } = pagination;

  const { entities: filterEntities } = state.filterList;
  const { viewWrongOnly } = filterEntities;

  return { myProblemList, loading, number, viewWrongOnly };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemApp);
