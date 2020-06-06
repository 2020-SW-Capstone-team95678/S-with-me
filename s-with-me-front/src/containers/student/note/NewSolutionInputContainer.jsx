import { connect } from 'react-redux';
import {
  setMyNewImageSolution,
  setMyNewTextSolution,
  setTempSolutionType as setSolutionType,
  setTempIsMath,
} from '../../../actions/noteActions';
import NewSolutionInput from '../../../components/student/note/NewSolutionInput';

const mapDispatchToProps = {
  setMyNewImageSolution,
  setMyNewTextSolution,
  setSolutionType,
  setTempIsMath,
};

export default connect(null, mapDispatchToProps)(NewSolutionInput);
