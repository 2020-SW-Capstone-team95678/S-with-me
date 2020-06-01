import { connect } from 'react-redux';
import { setMySolution } from '../../../actions/myProblemActions';
import { requestChapterList } from '../../../actions/chapterActions';
import SolutionInput from '../../../components/student/problem/SolutionInput';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);

  return { chapterList };
};

export default connect(mapStateToProps, { setMySolution, requestChapterList })(SolutionInput);
