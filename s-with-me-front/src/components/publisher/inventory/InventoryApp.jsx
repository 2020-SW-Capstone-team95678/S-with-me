import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import BookOverview from './BookOverview';

class InventoryApp extends PureComponent {
  componentDidMount() {
    const { requestBookList } = this.props;
    const publisherId = window.sessionStorage.getItem('publisherId');
    requestBookList({ publisherId: publisherId });
  }

  render() {
    const { bookList, isLoading, styles } = this.props;
    return (
      <div {...css(styles.app)}>
        <div style={{ flex: 1 }} {...css(styles.table)}>
          서점 필터
        </div>
        <div style={{ flex: 3, padding: 10 }} {...css(styles.table)}>
          <BookOverview bookList={bookList} isLoading={isLoading} />
        </div>
        <div style={{ flex: 1 }} {...css(styles.table)}>
          판매 부수랑 수익 overview
        </div>
      </div>
    );
  }
}

export default withStyles(({ responsive }) => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 11,
    paddingTop: 11,
    fontWeight: 'bold',
  },
  app: {
    display: 'flex',
    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
  table: {
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(InventoryApp);
