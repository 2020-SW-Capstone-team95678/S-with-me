import { connect } from 'react-redux';
import {
  setMyNewImageSolution,
  setMyNewLinkSolution,
  setMyNewTextSolution,
  setTempSolutionType as setSolutionType,
  setTempIsMath,
} from '../../../actions/noteActions';
import { requestChapterList } from '../../../actions/chapterActions';
import NewSolutionInput from '../../../components/student/note/NewSolutionInput';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);
  return { chapterList };
};

const mapDispatchToProps = {
  setMyNewImageSolution,
  setMyNewLinkSolution,
  setMyNewTextSolution,
  requestChapterList,
  setSolutionType,
  setTempIsMath,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSolutionInput);
