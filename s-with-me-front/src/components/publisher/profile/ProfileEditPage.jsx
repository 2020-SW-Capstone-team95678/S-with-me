import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import Input from '../../../common-ui/Input';
import InlineList from '../../../common-ui/InlineList';
import Form from '../../../common-ui/Form';
import {Consumer as Modal} from '../../../common-ui/Modal/context';
import Api from '../../../Api';
import Button from '../../../common-ui/Button';

class ProfileEditPage extends PureComponent{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values, closeModal){
        const {name, code} = this.props;
        const formValues = {
            ...values,
            code,
            name,
        };
        Api
            .post('/profile', formValues)
            .then(()=>closeModal());
    }
    render(){
        const {name,price,type} = this.props;
        const typeName = type === 'edit' ? '수정' : '예비'; //profile은 수정만 존재
        return(
            <Modal>
                {({closeModal}) =>(
                    <Form onSubmit={values => this.handleSubmit(values, closeModal)} initValues={{currentPrice:price}}
                    >
                        <Form.Consumer>
                        {({ onChange, values})=>(
                            <Spacing horizontal={4} vertical={8}>
                                <Text xlarge bold>
                                    프로필 수정
                                </Text>
                                <Spacing bottom={2}>
                                    <div>프로필 사진<Button>사진 변경</Button></div>
                                    <Input name="password" label="비밀번호" value={values['amount']} onChange={onChange}/>

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

ProfileEditPage.PropTypes = {
    createTransaction: PropTypes.func,
};

export default ProfileEditPage;