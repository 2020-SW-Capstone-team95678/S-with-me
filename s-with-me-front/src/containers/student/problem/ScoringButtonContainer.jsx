import { connect } from 'react-redux';
import { setSolvedDateTime, setIsRight } from '../../../actions/myProblemActions';
import ScoringButton from '../../../components/student/problem/ScoringButton';
import { setLastMyProblemId } from '../../../actions/myBookActions';

export default connect(null, { setIsRight, setSolvedDateTime, setLastMyProblemId })(ScoringButton);
