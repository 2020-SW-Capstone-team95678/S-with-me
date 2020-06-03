import { connect } from 'react-redux';
import { requestChapterList } from '../../../actions/chapterActions';
import ChapterList from '../../../components/student/libarary/ChapterList';

const mapStateToProps = (state, props) => {
  const { ids: chapterIds, entities: chapterEntities } = state.chapter;
  const chapterList = chapterIds.map(id => chapterEntities[id]);
  return { chapterList };
};

export default connect(mapStateToProps, { requestChapterList })(ChapterList);
