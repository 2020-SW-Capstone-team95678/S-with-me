import { connect } from 'react-redux';
import CreateCurriculumPage from '../../../components/student/libarary/CreateCurriculumPage';

const mapStateToProps = (state, props) => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);

  return { chapterList };
};

export default connect(mapStateToProps, {})(CreateCurriculumPage);
