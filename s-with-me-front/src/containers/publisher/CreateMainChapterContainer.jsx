import { connect } from 'react-redux';
import { CREATE_MAIN_CHAPTER, createMainChapter} from '../../actions/createMainChapterAction';
import IndexItem from '../../components/publisher/addBook/addIndex/IndexItem';

const mapDispatchToProps = state => {
  const { loadingState} = state.mainChapter;
  const loading = loadingState[CREATE_MAIN_CHAPTER];
  return { loading};
};

export default connect(mapDispatchToProps, { createMainChapter })(IndexItem);