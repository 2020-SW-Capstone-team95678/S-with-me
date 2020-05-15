import { connect } from 'react-redux';
import { setMyProblemList } from '../../../actions/myProblemActions';
import ProblemList from '../../../components/student/problem/ProblemList';

const mapStateToProps = state => {
  const { ids, entities } = state.myProblemList;
  const myProblemList = ids.map(id => entities[id]);

  return { myProblemList };
};

const mapDispatchToProps = {
  setMyProblemList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);
