import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';

export default class DeleteNote extends PureComponent {
  static propTypes = {
    deleteNote: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(closeModal) {
    const { myProblemId } = this.props;
    Api.delete('/student/note', { params: { myProblemId: myProblemId } })
      .then(() => closeModal())
      .catch(() => closeModal());
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
