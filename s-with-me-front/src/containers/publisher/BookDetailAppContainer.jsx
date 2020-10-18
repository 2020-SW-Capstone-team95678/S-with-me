import { connect } from 'react-redux';
import {
  requestChapterList,
  createMainChapter,
  updateMainChapter,
  deleteMainChapter,
  createSubChapter,
  updateSubChapter,
  deleteSubChapter,
} from '../../actions/chapterActions';
import { updateBook, requestBookList } from '../../actions/inventoryActions.js';
import BookDetailApp from '../../components/publisher/inventory/BookDetailApp';

const mapStateToProps = (state, props) => {
  const { ids: chapterIds, entities: chapterEntities } = state.chapter;
  const chapterList = chapterIds.map(id => chapterEntities[id]);

  const { book } = props.location.state;
  const { entities } = state.inventory;

  return { chapterList, book: entities[book.bookId] };
};

export default connect(mapStateToProps, {
  requestChapterList,
  createMainChapter,
  updateMainChapter,
  deleteMainChapter,
  createSubChapter,
  updateSubChapter,
  deleteSubChapter,
  updateBook,
  requestBookList,
})(BookDetailApp);
