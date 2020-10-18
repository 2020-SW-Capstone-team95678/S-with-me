import { connect } from 'react-redux';

import { requestBookList, deleteBook } from '../../actions/inventoryActions';
import BookCard from '../../components/publisher/inventory/BookCard';

export default connect(null, { requestBookList, deleteBook })(BookCard);
