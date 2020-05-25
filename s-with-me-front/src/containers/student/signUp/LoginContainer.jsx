import { connect } from 'react-redux';
import { setUser, SET_USER } from '../../../actions/userActions';
import LoginApp from '../../../components/LoginApp';

const mapDispatchToProps = state => {
  const { loadingState, entity } = state.user;
  const user = entity;
  const loading = loadingState[SET_USER];
  return { loading, user };
};

export default connect(mapDispatchToProps, { setUser })(LoginApp);
