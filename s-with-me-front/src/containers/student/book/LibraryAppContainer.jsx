import { connect } from 'react-redux';
import { requestMyBookList } from '../../../actions/myBookPackActions';
import LibraryApp from '../../../components/student/libarary/LibraryApp';

const mapStateToProps = state => {
  const { ids, entities, loading } = state.myBookList;
  const { entity } = state.user;
  const user = entity;
  const myBookList = ids.map(id => entities[id]);

  return { myBookList, user, loading };
};

const mapDispatchToProps = {
  requestMyBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
