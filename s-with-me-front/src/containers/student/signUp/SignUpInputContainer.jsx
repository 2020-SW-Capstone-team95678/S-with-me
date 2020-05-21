import { connect } from 'react-redux';
import { setUser } from '../../../actions/userActions';
import SignUpS from '../../../components/signUp/SignUpS';

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpS);
