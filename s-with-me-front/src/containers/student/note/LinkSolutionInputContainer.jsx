import { connect } from 'react-redux';
import { setMyNewLinkSolution } from '../../../actions/noteActions';
import { setLinkSolutionId } from '../../../actions/myProblemActions';
import { requestChapterList } from '../../../actions/chapterActions';
import LinkSolutionInput from '../../../components/student/problem/solutionInput/LinkSolutionInput';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);
  return { chapterList };
};

const mapDispatchToProps = {
  setMyNewLinkSolution,
  setLinkSolutionId,
  requestChapterList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkSolutionInput);
