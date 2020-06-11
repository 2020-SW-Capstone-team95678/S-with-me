import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import Api from '../../../Api';

import BookstoreFilter from './BookstoreFilter';
import BookInfo from './BookInfo';
import { Button, Icon, Modal } from 'semantic-ui-react';
import BookPayInput from './BookPayInput';

class BookDetail extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { book: {}, isPayMode: false, modalOpen: false };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  handlePayButton = () => {
    const { isPayMode } = this.state;
    const { bookId } = this.props.match.params;
    const { myBookList } = this.props;
    if (this.isAlreadyPaid(bookId, myBookList)) {
      this.handleOpen();
    } else this.setState({ isPayMode: !isPayMode });
  };

  isAlreadyPaid = (selectedBookId, myBookList) => {
    const found = myBookList.filter(({ bookId }) => bookId === selectedBookId * 1);
    if (found.length > 0) return true;
    else return false;
  };
  componentDidMount() {
    this._isMounted = true;
    const { bookId } = this.props.match.params;
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestMyBookList } = this.props;
    requestMyBookList({ studentId: studentId });
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
                <Button animated="vertical" size="large" onClick={() => this.handlePayButton()}>
                  <Button.Content hidden>{isPayMode ? '되돌리기' : '구입하기'}</Button.Content>
                  <Button.Content visible>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </div>
              <Modal open={this.state.modalOpen} onClose={this.handleClose} basic size="tiny">
                <Modal.Content>
                  <h3>이미 구입한 책입니다.</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={this.handleClose} inverted>
                    <Icon name="checkmark" /> Got it
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </div>
          {isPayMode ? (
            <div style={{ flex: 1, padding: 3 }} {...css(styles.box)}>
              <BookPayInput book={book} bookId={bookId} />
            </div>
          ) : null}
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
