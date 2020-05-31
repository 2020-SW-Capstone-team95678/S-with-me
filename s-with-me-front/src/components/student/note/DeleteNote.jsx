import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

export default class DeleteNote extends PureComponent {
  static propTypes = {
    deleteNote: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(closeModal) {
    const studentId = window.sessionStorage.getItem('studentId');
    const { myProblemId, deleteNote, requestNoteList } = this.props;
    deleteNote({ myProblemId: myProblemId }, () => {
      closeModal();
      requestNoteList({ studentId: studentId });
    });
  }

  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Spacing horizontal={4} vertial={8}>
            <Text xlarge bold>
              정말로 삭제하시겠습니까?
            </Text>
            <Text large>삭제를 누르면 오답노트에서 완전히 삭제됩니다.</Text>
            <InlineList spacingBetween={1}>
              <Button primary onPress={() => this.handleSubmit(closeModal)}>
                삭제
              </Button>
              <Button primary onPress={closeModal}>
                취소
              </Button>
            </InlineList>
          </Spacing>
        )}
      </Modal>
    );
  }
}
