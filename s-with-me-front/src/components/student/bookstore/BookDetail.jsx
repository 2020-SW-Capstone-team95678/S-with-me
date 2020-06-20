import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import Api from '../../../Api';

import BookInfo from './BookInfo';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';

import AutoContainModal from './AutoContainModal';
import BookPayInputContainer from '../../../containers/bookstore/BookPayInputContainer';

class BookDetail extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { book: {}, isPayMode: false, modalOpen: false, autoContainModalOpen: false };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  handlePayButton = () => {
    const { isPayMode, book } = this.state;
    const { bookId } = this.props.match.params;
    const { myBookList } = this.props;
    if (this.isAlreadyPaid(bookId, myBookList)) {
      this.handleOpen();
    } else {
      if (book.price === 0) {
        this.setState({ autoContainModalOpen: true });
      } else this.setState({ isPayMode: !isPayMode });
    }
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
    const { styles, buyMyBook } = this.props;
    const { bookId } = this.props.match.params;
    const { book, isPayMode, autoContainModalOpen } = this.state;
    return (
      <div {...css(styles.app)}>
        <div style={{ flex: 1, padding: 3 }} {...css(styles.box)}>
          <div style={{ flex: 1 }} {...css(styles.imageBox)}>
            <Image src={book.cover} size="small" bordered centered />
          </div>
          <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
            <BookInfo book={book} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}>
              <Button animated="vertical" basic size="large" onClick={() => this.handlePayButton()}>
                <Button.Content hidden>{isPayMode ? '되돌리기' : '구입하기'}</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            </div>
            {autoContainModalOpen ? (
              <AutoContainModal cover={book.cover} id={bookId} buyMyBook={buyMyBook} />
            ) : null}
            <Modal open={this.state.modalOpen} onClose={this.handleClose} basic size="tiny">
              <Modal.Content>
                <h3>이미 구입한 책입니다.</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" onClick={this.handleClose} inverted>
                  <Icon name="checkmark" /> 알겠어요
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
        {isPayMode ? (
          <div style={{ flex: 1, padding: 3 }} {...css(styles.box)}>
            <BookPayInputContainer book={book} bookId={bookId} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(({ responsive }) => ({
  app: {
    display: 'flex',
    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
  box: {
    display: 'flex',
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
    [responsive.medium]: {
      flexDirection: 'column',
    },
    [responsive.small]: {
      flexDirection: 'column',
    },
  },
  imageBox: {
    [responsive.medium]: {
      display: 'flex',
      justifyContent: 'center',
    },
    [responsive.small]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}))(BookDetail);
