import { connect } from 'react-redux';

import { setMyAnswer } from '../../../actions/myProblemActions';
import ProblemResultView from '../../../components/student/problem/ProblemResultView';

export default connect(null, { setMyAnswer })(ProblemResultView);
