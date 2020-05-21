import { connect } from 'react-redux';
import { requestMyBookList } from '../../../actions/myBookPackActions';
import LibraryApp from '../../../components/student/libarary/LibraryApp';

const mapStateToProps = (state) => {
  const { ids, entities, loading } = state.myBookList;
  const myBookList = ids.map((id) => entities[id]);

  return { myBookList, loading };
};

const mapDispatchToProps = {
  requestMyBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
