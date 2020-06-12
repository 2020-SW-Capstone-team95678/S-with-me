import { connect } from 'react-redux';
import {
  setImageSolution,
  setTextSolution,
  setLinkSolutionId,
  setHandSolution,
  setSolutionType,
  setIsMath,
} from '../../../actions/myProblemActions';
import { requestChapterList } from '../../../actions/chapterActions';
import SolutionInput from '../../../components/student/problem/SolutionInput';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);

  return { chapterList };
};

const mapDispatchToProps = {
  setImageSolution,
  setTextSolution,
  setLinkSolutionId,
  setHandSolution,
  requestChapterList,
  setSolutionType,
  setIsMath,
};

export default connect(mapStateToProps, mapDispatchToProps)(SolutionInput);
