import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default class DeleteNote extends PureComponent {
  static propTypes = {
    deleteNote: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit() {
    const studentId = window.sessionStorage.getItem('studentId');
    const { myProblemId, deleteNote, requestNoteList } = this.props;
    deleteNote({ myProblemId: myProblemId }, () => {
      this.close();
      requestNoteList({ studentId: studentId });
    });
  }

  render() {
    const { open } = this.state;
    return (
      <React.Fragment>
        <Button icon="delete" content="오답노트에서 삭제" onClick={this.show} />
        <Modal open={open} basic size="small">
          <Modal.Content>
            <p>정말로 삭제하시겠습니까?</p>
            <p>삭제를 누르면 오답노트에서 완전히 삭제됩니다.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" inverted onClick={this.handleSubmit}>
              <Icon name="remove" /> 삭제하기
            </Button>
            <Button inverted basic onClick={this.close}>
              <Icon name="redo" /> 취소하기
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
