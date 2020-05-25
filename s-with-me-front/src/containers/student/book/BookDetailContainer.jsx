import { connect } from 'react-redux';
import BookDetail from '../../../components/student/libarary/BookDetail';
import { requestChapterList } from '../../../actions/chapterActions';

const mapStateToProps = (state, props) => {
  const { ids, entities } = state.myBookList;
  const myBookList = ids.map(id => entities[id]);

  const { ids: chapterIds, entities: chapterEntities } = state.chapter;
  const chapterList = chapterIds.map(id => chapterEntities[id]);

  const { myBookId } = props.match.params;
  for (let myBook of myBookList) {
    if (myBook.myBookId === myBookId * 1) {
      return { myBook, chapterList };
    }
  }
};

export default connect(mapStateToProps, { requestChapterList })(BookDetail);
