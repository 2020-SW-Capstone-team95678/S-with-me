import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Heading from '../../../common-ui/Heading';

import AppNav, { HEIGHT } from '../AppNav';
import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import Input from '../../../common-ui/Input';
import VerticalList from '../../../common-ui/VerticalList';
import { Link} from 'react-router-dom';
import Form from '../../../common-ui/Form';

import { validate } from './validate.js';


 
class AddBook extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { bookId: '',registerComplete: false, isValidForm: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(values) {
    const {createBook} = this.props;
    if (this.state.isValidForm) {
      createBook(values, () => this.setState({ registerComplete: true }));
    }

  }

  

  handleSendBookId=()=>{

    const {bookId} = this.props;
    console.log("handleSendBookId"+bookId);
    this.setState({bookId:bookId});
    this.props.onGetBookId(bookId)
  }

  render() {

    const { loading,styles } = this.props;
    //const { registerComplete, isCheck, currentUserId } = this.state;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <Heading level={4}>Add Book</Heading>
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 1, padding: 3,minWidth:200, border:'2px rgb(247, 207, 192) solid', flexDirection:'row', }}>
               
                <div style={{ margin:10, flexDirection:'column',  }}>문제집 사진<Button>사진 등록</Button></div>
                
            </div>
            <div style={{flex:2}}>

            <Form onSubmit={values => this.handleSubmit(values)}>
              <div style={{display:'flex' ,flexDirection:'row',}}>
                <div style={{flex: 4}}>
                  <Form.Consumer>
                    {({ onChange, values }) => {
                      let errors = validate(values);
                        if (!errors.length) this.setState({ isValidForm: true });
                          return (
                            <div className="input" {...css(styles.inputBox)}>
                              <VerticalList spacingBetween={1}>
                                <Text>학년</Text>
                                  <Input
                                  name="bookGrade"
                                  onChange={onChange}
                                  errorMessage={errors['bookGrade']}
                                />
                                <Text>책이름</Text>
                                <Input 
                                  name="bookName"
                                  onChange={onChange}
                                  errorMessage={errors['bookName']}
                                />
                                <Text>과목</Text>
                                <Input 
                                  name="bookSubject"
                                  onChange={onChange}
                                  errorMessage={errors['bookSubject']}
                                />
                                <Text>문제집 소개</Text>
                                <textarea style={{ height:100, width:"100%"}}
                                  name="bookInfo"
                                  onChange={onChange}
                                  errorMessage={errors['bookInfo']}
                                />
                                <Text>가격</Text>
                                <Input
                                  name="bookPrice"
                                  onChange={onChange}
                                  errorMessage={errors['bookPrice']}
                                />

                              </VerticalList>
                            </div>
                          );
                    }}
                  </Form.Consumer>
                </div>
                <div className="button" style={{ display:'flex', flex: 1 , padding: 3, flexDirection: 'column' }}>
                  <Button type="submit" disabled={loading} onClick={this.handleSendBookId(this)}>      등록      </Button>
                  <Link to="/library">
                    <Button >      취소      </Button>
                  </Link>
                </div>
              </div>
            </Form>
            </div>
          </div>
        </div>
        
       
      </div>
    );
  }
}

AddBook.propTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node,
};

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
  inputBox:{ 
    display:'flex',
    flex: 4, 
    padding: 30, 
    border:'2px rgb(247, 207, 192) solid', 
    flexDirection :'column',

    fontSize:10,
  },
  input:{ 
    fontSize:5
  }

}))(AddBook);




