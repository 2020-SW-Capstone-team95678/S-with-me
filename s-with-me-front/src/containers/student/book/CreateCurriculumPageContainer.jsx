import { connect } from 'react-redux';
import {
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from '../../../actions/curriculumActions';
import CreateCurriculumPage from '../../../components/student/libarary/CreateCurriculumPage';

const mapStateToProps = state => {
  const { ids, entities } = state.chapter;
  const chapterList = ids.map(id => entities[id]);

  return { chapterList };
};

export default connect(mapStateToProps, { createCurriculum, updateCurriculum, deleteCurriculum })(
  CreateCurriculumPage,
);
