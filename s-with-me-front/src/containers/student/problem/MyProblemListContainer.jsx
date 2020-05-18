import { connect } from 'react-redux';
import { requestMyProblemList } from '../../../actions/myProblemActions';
import ProblemList from '../../../components/student/problem/ProblemList';

const mapStateToProps = state => {
  const { ids, entities } = state.myProblemList;
  const myProblemList = ids.map(id => entities[id]);

  return { myProblemList };
};

const mapDispatchToProps = {
  requestMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
