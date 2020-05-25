// import { connect } from 'react-redux';
// import MyProfile from '../../../components/student/profile/Profile';
// import { requestMyProfile, FETCH_MY_PROFILE } from '../../../actions/myProfileAction';


// const mapStateToProps = state => {
//   const { ids, entities, loadingState } = state.myProfile;
//   const bookListLoading = loadingState[FETCH_MY_PROFILE];
//   const myProfile = ids.map(id => entities[id]);

//   return {  bookListLoading,myProfile };
// };

// const mapDispatchToProps = {
//   requestMyProfile
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);