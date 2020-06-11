import { connect } from 'react-redux';
import { requestMyBookList } from '../../actions/myBookPackActions';
import BookDetail from '../../components/student/bookstore/BookDetail';

const mapStateToProps = state => {
  const { ids, entities } = state.myBookList;
  const myBookList = ids.map(id => entities[id]);
  return { myBookList };
};
export default connect(mapStateToProps, { requestMyBookList })(BookDetail);
