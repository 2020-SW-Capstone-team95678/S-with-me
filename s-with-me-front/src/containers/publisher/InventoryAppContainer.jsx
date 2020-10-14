import { connect } from 'react-redux';

import { FETCH_PUBLISHER_INVENTORY, requestBookList } from '../../actions/inventoryActions';

import InventoryApp from '../../components/publisher/inventory/InventoryApp';

const mapStateToProps = state => {
  const { ids, entities, loadingState } = state.inventory;
  const isLoading = loadingState[FETCH_PUBLISHER_INVENTORY];
  const bookList = ids.map(id => entities[id]);

  return { bookList, isLoading };
};

export default connect(mapStateToProps, { requestBookList })(InventoryApp);
