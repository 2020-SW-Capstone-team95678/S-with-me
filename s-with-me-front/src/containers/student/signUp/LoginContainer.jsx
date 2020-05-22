import { connect } from 'react-redux';
import { setUser, SET_USER } from '../../../actions/userActions';
import LoginApp from '../../../components/LoginApp';

const mapDispatchToProps = state => {
  const { loadingState } = state.user;
  const loading = loadingState[SET_USER];
  return { user, loading };
};

export default connect(mapDispatchToProps, { setUser })(LoginApp);
