import { connect } from 'react-redux';
import SignUpS from '../../../components/signUp/SignUpS';
import { CREATE_USER, createUser } from '../../../actions/userActions';

const mapDispatchToProps = state => {
  const { loadingState } = state.user;
  const loading = loadingState[CREATE_USER];
  return { loading };
};

export default connect(mapDispatchToProps, { createUser })(SignUpS);
