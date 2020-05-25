import { connect } from 'react-redux';
import BookDetail from '../../../components/student/libarary/BookDetail';

const mapStateToProps = state => {
  const { ids, entities } = state.myBookList;
  const myBookList = ids.map(id => entities[id]);

  return { myBookList };
};

export default connect(mapStateToProps, null)(BookDetail);
