import { connect } from 'react-redux';
import {
  setMyNewImageSolution,
  setMyNewTextSolution,
  setTempSolutionType as setSolutionType,
  setTempIsMath,
  setMyNewHandSolution,
} from '../../../actions/noteActions';
import NewSolutionInput from '../../../components/student/note/NewSolutionInput';

const mapDispatchToProps = {
  setMyNewImageSolution,
  setMyNewTextSolution,
  setSolutionType,
  setTempIsMath,
  setMyNewHandSolution,
};

export default connect(null, mapDispatchToProps)(NewSolutionInput);
