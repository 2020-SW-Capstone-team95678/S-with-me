import { connect } from 'react-redux';
import { createCurriculum } from '../../../actions/myBookPackActions';
import CreateCurriculumPage from '../../../components/student/libarary/CreateCurriculumPage';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);

  return { chapterList };
};

export default connect(mapStateToProps, { createCurriculum })(CreateCurriculumPage);
