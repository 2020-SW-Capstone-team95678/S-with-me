import { connect } from 'react-redux';
import { FETCH_NOTE_LIST, requestNoteList, setNoteFilter } from '../../../actions/noteActions';
import NoteApp from '../../../components/student/note/NoteApp';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.note;
  const loading = loadingState[FETCH_NOTE_LIST];
  const noteList = ids.map(id => entities[id]);

  return { loading, noteList };
};

export default connect(mapStateToProps, { requestNoteList, setNoteFilter })(NoteApp);
