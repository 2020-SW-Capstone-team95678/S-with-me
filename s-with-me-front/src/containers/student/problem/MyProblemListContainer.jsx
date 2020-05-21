import { connect } from 'react-redux';
import { requestMyProblemList } from '../../../actions/myProblemPackActions';
import ProblemList from '../../../components/student/problem/ProblemList';

const mapStateToProps = state => {
  const { pagination, ids, entities, loading } = state.myProblemList;
  const { number } = pagination;
  const myProblemList = ids.map(id => entities[id]);

  return { myProblemList, loading, number };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
