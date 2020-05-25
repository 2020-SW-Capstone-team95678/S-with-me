import { connect } from 'react-redux';

import { setIsSolved, setMyAnswer } from '../../../actions/myProblemActions';
import ProblemResultView from '../../../components/student/problem/ProblemResultView';

export default connect(null, { setIsSolved, setMyAnswer })(ProblemResultView);
