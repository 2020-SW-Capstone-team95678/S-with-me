import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Heading from '../../../common-ui/Heading';

import AppNav, { HEIGHT } from '../AppNav';
import GradeList from './GradeList';
import Button from '../../../common-ui/Button';
import Spacing from '../../../common-ui/Spacing';
import Input from '../../../common-ui/Input';
import IndexOverview from './IndexList';


class AddBook extends PureComponent {
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <Heading level={4}>Add Book</Heading>
        <div {...css(styles.body)}>
          <div style={{ display: 'flex' }} {...css(styles.container)}>
            <div style={{ flex: 4, padding: 3, border:'2px rgb(247, 207, 192) solid', flexDirection:'row', }}>
               
                <div style={{ flex: 1, margin:10, flexDirection:'column',  }}>문제집 사진<Button>사진 등록</Button></div>
                
            </div>
            <div style={{ flex: 4, padding: 3, border:'2px rgb(247, 207, 192) solid', }}>
                <div style={{ flex: 1, margin:10, flexDirection:'column',padding:3}}>
                    
                    <Spacing horizontal={4} vertical={8}>
                        <Spacing bottom={2}>
                        <Input name="name" label="문제집 이름" />
                        <GradeList />
                        <Input name="bookinfo" label="문제집 소개" />
                        <Input name="price" label="가격" />

                        </Spacing>
                                    
                    </Spacing>
                    
                </div>  
            </div>
            <div style={{ flex: 1 , padding: 3, flexDirection: 'column' }}>
              <Button >      등록      </Button>
              <Button >      취소      </Button>
            </div>
          </div>
        </div>
        <div {...css(styles.body)}>
            <div style={{ display: 'flex', backgroundColor:'rgb(247, 207, 192)'  }} {...css(styles.container)}>
                <div style={{ flex : 1}}> 문제등록</div>
                <div style={{ width: 100, padding: 3 }}>
                     <Button small>전체 저장</Button>
                 </div>
                
            </div>

        </div>
        <div {...css(styles.body)}>
            <div style={{ display: 'flex', border:'2px rgb(247, 207, 192) solid' }} {...css(styles.container)}>
                <div style={{ flex: 4, padding: 3 }}>
                    <IndexOverview />
                </div>
            </div>
        </div>
        <div {...css(styles.body)}>
            <div style={{ display: 'flex', border:'2px rgb(247, 207, 192) solid' }} {...css(styles.container)}>
                
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
}))(AddBook);





