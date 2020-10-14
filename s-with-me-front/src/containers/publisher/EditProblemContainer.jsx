import { connect } from 'react-redux';
import { requestProblemList, createProblem, updateProblem } from '../../actions/problemAction';

import EditProblem from '../../components/publisher/inventory/EditProblem';

export default connect(null, { requestProblemList, createProblem, updateProblem })(EditProblem);
