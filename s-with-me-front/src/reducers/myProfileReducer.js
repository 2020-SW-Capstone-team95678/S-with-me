
// import { handle } from 'redux-pack';
// import { FETCH_MY_PROFILE } from '../actions/myProfileAction';

// const initState = {
//   ids: [],
//   entities: {},
//   loadingState: {
//     [FETCH_MY_PROFILE]: false,
//   },
//   errorState: {
//     [FETCH_MY_PROFILE]: false,
//   },
// };

// export default (state = initState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case FETCH_MY_BOOK_LIST: {
//       return handle(state, action, {
//         start: prevState => ({
//           ...prevState,
//           loadingState: { ...prevState.loadingState, [type]: true },
//           errorState: { ...prevState.errorState, [type]: false },
//         }),
//         success: prevState => {
//           const { data } = payload;
//           const loadingAndErrorState = {
//             loadingState: { ...prevState.loadingState, [type]: false },
//             errorState: { ...prevState.errorState, [type]: false },
//           };
//           if (type === FETCH_MY_PROFILE) {
//             const ids = data.map(entity => entity['studentId']);
//             const entities = data.reduce(
//               ( entity) => ({
//                 [entity['studentId']]: entity,
//               }),
//               {},
//             );
//             return {
//               ...prevState,
//               ...loadingAndErrorState,
//               ids,
//               entities: { ...prevState.entities, ...entities },
//             };
//           } else {
//             return {
//               ...prevState,
//               ...loadingAndErrorState,
//             };
//           }
//         },
//         failure: prevState => {
//           const { errorMessage } = payload.response.data;
//           return {
//             ...prevState,
//             loadingState: { ...prevState.loadingState, [type]: false },
//             errorState: { ...prevState.errorState, [type]: errorMessage || true },
//           };
//         },
//       });
//     }
   
//     default:
//       return state;
//   }
// };
