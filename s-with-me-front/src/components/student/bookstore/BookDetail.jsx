import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import Api from '../../../Api';

import BookstoreFilter from './BookstoreFilter';
import BookInfo from './BookInfo';
import { Button, Icon } from 'semantic-ui-react';
import BookPay from './BookPay';

class BookDetail extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { book: {}, isPayMode: false };
  }

  componentDidMount() {
    this._isMounted = true;
    const { bookId } = this.props.match.params;
    Api.get(`/publisher/library/book/${bookId}`).then(({ data }) => {
      if (this._isMounted) this.setState({ book: data });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { styles } = this.props;
    const { bookId } = this.props.match.params;
    const { book, isPayMode } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <BookstoreFilter />
        <div style={{ flex: 4 }}>
          <div style={{ flex: 1, padding: 3 }} {...css(styles.box)}>
            <div style={{ flex: 1 }}>
              <img src={book.cover} alt="book-cover" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
              <BookInfo book={book} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}>
                <Button
                  animated="vertical"
                  size="large"
                  onClick={() => this.setState({ isPayMode: !isPayMode })}
                >
                  <Button.Content hidden>{isPayMode ? '되돌리기' : '구입하기'}</Button.Content>
                  <Button.Content visible>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: 3 }} {...css(styles.box)}>
            {isPayMode ? <BookPay book={book} bookId={bookId} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(() => ({
  box: {
    display: 'flex',
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(BookDetail);
