import { connect } from 'react-redux';
import { requestMyProblemList, FETCH_MY_PROBLEM_LIST } from '../../actions/myProblemPackActions';
import {
  requestNoteList,
  requestFilteredNoteList,
  FETCH_NOTE_LIST,
} from '../../actions/noteActions';
import {
  requestBookList,
  FETCH_BOOK_LIST,
  requestSearchResultList,
} from '../../actions/bookAction';
import Pagination from '../../components/student/Pagination';

const mapStateToProps = (state, props) => {
  if (props.isNote) {
    const { pagination, ids, loadingState, filter } = state.note;
    const { number, size } = pagination;
    const loading = loadingState[FETCH_NOTE_LIST];

    return {
      pageNumber: number || 1,
      hasNext: ids.length === size,
      loading,
      filter,
    };
  } else if (props.isBookstore) {
    const { pagination, generalIds, loadingState, filter } = state.book;
    const { number, size } = pagination;
    const loading = loadingState[FETCH_BOOK_LIST];
    return {
      pageNumber: number || 1,
      hasNext: generalIds.length === size,
      loading,
      filter,
    };
  } else {
    const { pagination, ids, loadingState } = state.myProblemList;
    const { number, size } = pagination;
    const loading = loadingState[FETCH_MY_PROBLEM_LIST];
    return {
      pageNumber: number || 1,
      hasNext: ids.length === size,
      loading,
    };
  }
};

const mapDispatchToProps = {
  requestMyProblemList,
  requestNoteList,
  requestFilteredNoteList,
  requestBookList,
  requestSearchResultList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
