import { connect } from 'react-redux';
import {
  setResolve,
  setMyNewAnswer,
  setMyNewSolution,
  setNewIsRight,
  setNewSolvedDateTime,
} from '../../../actions/noteActions';
import NoteResolve from '../../../components/student/note/NoteResolve';

const mapDispatchToProps = {
  setResolve,
  setMyNewAnswer,
  setMyNewSolution,
  setNewIsRight,
  setNewSolvedDateTime,
};

export default connect(null, mapDispatchToProps)(NoteResolve);
