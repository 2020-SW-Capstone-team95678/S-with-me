import { connect } from 'react-redux';

import { FETCH_PROBLEM_LIST, requestProblemList, deleteProblem } from '../../actions/problemAction';

import EditorApp from '../../components/publisher/inventory/EditorApp';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.problemList;
  const isLoading = loadingState[FETCH_PROBLEM_LIST];
  const problemList = ids.map(id => entities[id]);

  return { problemList, isLoading };
};

export default connect(mapStateToProps, { requestProblemList, deleteProblem })(EditorApp);
