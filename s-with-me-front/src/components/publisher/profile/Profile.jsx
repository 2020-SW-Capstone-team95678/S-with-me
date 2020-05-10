import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Select, { Option } from '../../../common-ui/Select';
import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';

import AppNav, { HEIGHT } from '../AppNav';
import Button from '../../../common-ui/Button';


class BookDetail extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>
          <div style={{ display: 'flex', justifyContent: 'center' }} {...css(styles.container)} >
            
            <div style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
              <div 
                style={{
                  height : 400,
                  width : 300,
                  flexDirection: 'column',
                  padding: 3,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius : 10,
                  alignItems:'center',
                }}
                >
                <div
                style={{
                  height: 100,
                  flexDirection: 'column',
                  padding: 3,
                  margin:30,
                  border: '1px red solid',
                }}
                >
                    출판사 로고
                </div>
                
                <Button>나의 프로필 수정/저장</Button>
              </div>
              
            </div>
            <div style={{ flex:3, height : 400,
                  width : 500,
                  flexDirection: 'column',
                  padding: 3,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius : 10,
                  alignItems:'center' }}>
              <Form.Consumer>
                {({ onChange, values }) => (
                  <InlineList spacingBetween={1}>
                    <Select name="PubInfoFilter" onChange={onChange}>
                        <Option label="정렬 방식을 선택하세요" />
                        <Option label="과목별로 분류" value="subject" />
                        <Option label="학년별로 분류" value="grade" />
                        <Option label="가나다순으로 정렬" value="alphabet" />
                    </Select>
                  </InlineList>
                )}
              </Form.Consumer>
              <h4>(한달 기준)판매 부수(기본 : 총)</h4>
            </div>
            <div style={{ flex:3, height : 400,
                  width : 500,
                  flexDirection: 'column',
                  padding: 3,
                  border: '2px rgb(247, 207, 192) solid',
                  borderRadius : 10,
                  alignItems:'center' ,
                  justifyContent: 'center'}}>
                      <h4>(한달 기준)판매 부수(기본 : 총)</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
  },
  body: {
    padding: unit * 4,
  },
}))(BookDetail);
