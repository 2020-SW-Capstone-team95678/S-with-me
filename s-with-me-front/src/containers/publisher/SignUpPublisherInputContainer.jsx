import { connect } from 'react-redux';
import { CREATE_USER, createUser, checkIdDuplication } from '../../actions/userActions';
import PublisherSignUp from '../../components/signUp/PublisherSignUp';

const mapDispatchToProps = state => {
  const { loadingState, entity } = state.user;
  const loading = loadingState[CREATE_USER];
  const isOnlyId = entity;
  return { loading, isOnlyId };
};

export default connect(mapDispatchToProps, { createUser, checkIdDuplication })(PublisherSignUp);
