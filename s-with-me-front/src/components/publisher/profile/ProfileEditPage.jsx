import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Text from '../../../commom-ui/Text';
import Spacing from '../../../commom-ui/Spacing';
import Input from '../../../common-ui/Buttom';
import InlineList from '../../../common-ui/InlineList';
import Form from '../../../commom-ui/Form';
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
        const typeName = type === 'sell' ? '수정' : '예비'; //profile은 수정만 존재
        return(
            <modal>
                {({closeModal}) =>(
                    <Form onSubmit={values => this.handleSubmit(values, closeModal)} initValues={{currentPrice:price}}
                    >
                        <Form.Consumer>
                        {({ onChange, values})=>(
                            <Spacing horizontal={4} vertical={8}>
                                <Text xlarge bold>
                                    {name} {typeName}
                                </Text>
                                <Spacing bottom={2}>
                                    <Input name="currentPrice" label="금액" value={values['amount']} onChange={onChange}/>

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
            </modal>
        );
    }
}

ProfileEditPage.PropTypes = {
    createTransaction: PropTypes.func,
};

export default ProfileEditPage;