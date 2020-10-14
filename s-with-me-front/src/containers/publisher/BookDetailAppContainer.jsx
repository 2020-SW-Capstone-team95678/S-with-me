import { connect } from 'react-redux';
import { requestChapterList } from '../../actions/chapterActions';
import BookDetailApp from '../../components/publisher/inventory/BookDetailApp';

const mapStateToProps = state => {
  const { ids: chapterIds, entities: chapterEntities } = state.chapter;
  const chapterList = chapterIds.map(id => chapterEntities[id]);
  return { chapterList };
};

export default connect(mapStateToProps, { requestChapterList })(BookDetailApp);
