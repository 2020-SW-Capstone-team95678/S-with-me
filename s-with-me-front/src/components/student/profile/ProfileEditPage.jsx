import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import Input from '../../../common-ui/Input';
import InlineList from '../../../common-ui/InlineList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import Button from '../../../common-ui/Button';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';

class ProfileEditPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values, closeModal) {
    const { name, code } = this.props;
    const formValues = {
      ...values,
      code,
      name,
    };
    Api.post('/profile', formValues).then(() => closeModal());
  }
  render() {
    const { price, type } = this.props;
    const typeName = type === 'edit' ? '수정' : '예비'; //profile은 수정만 존재
    return (
      <Modal>
        {({ closeModal }) => (
          <Form
            onSubmit={values => this.handleSubmit(values, closeModal)}
            initValues={{ currentPrice: price }}
          >
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={8}>
                  <Text xlarge bold>
                    프로필 수정
                  </Text>
                  <Spacing bottom={2}>
                    <Input
                      name="phoneNumber"
                      label="휴대폰 번호"
                      value={values['amount']}
                      onChange={onChange}
                    />
                    <Input
                      name="password"
                      label="비밀번호"
                      value={values['amount']}
                      onChange={onChange}
                    />
                    <InlineList spacingBetween={1}>
                      <Text>학년</Text>
                      <Form.Consumer name="grade" label="학년" value={values['amount']}>
                        {({ onChange, values }) => (
                          <InlineList spacingBetween={1}>
                            <Select name="PayFilter" onChange={onChange}>
                              <Option label="선택" />
                              <Option label="1학년" value="grade1" />
                              <Option label="2학년" value="grade2" />
                              <Option label="3학년" value="grade3" />
                            </Select>
                          </InlineList>
                        )}
                      </Form.Consumer>
                    </InlineList>
                  </Spacing>
                  <InlineList spacingBetween={1}>
                    <Button primary>{typeName}</Button>
                    <Button onPress={closeModal}>취소</Button>
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </Modal>
    );
  }
}

ProfileEditPage.propTypes = {
  createTransaction: PropTypes.func,
};

export default ProfileEditPage;
