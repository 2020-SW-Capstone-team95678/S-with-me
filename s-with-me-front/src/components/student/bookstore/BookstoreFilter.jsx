import React from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import { subjects } from '../../../constants/subjects';

import Card from '../../../common-ui/Card';
import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import Button from '../../../common-ui/Button';
import Select, { Option } from '../../../common-ui/Select';

function BookstoreFilter(props) {
  const { styles } = props;
  return (
    <Form onSubmit={values => console.log(values)}>
      <Form.Consumer>
        {({ onChange }) => (
          <div style={{ flex: 1 }} {...css(styles.box)}>
            <div style={{ flex: 1 }}>
              <Card vertical={2}>
                <div {...css(styles.head)}>검색하기</div>
              </Card>
              <div style={{ display: 'flex' }}>
                <Input onChange={onChange} name="bookstoreSearch" placeholder="Search..." />
                <Button xsmall>Go!</Button>
              </div>
              <div style={{ paddingBottom: 15 }} />
            </div>
            <div style={{ flex: 1 }}>
              <Card vertical={2}>
                <div {...css(styles.head)}>학년 선택하기</div>
              </Card>
              <Select name="selectGrade" onChange={onChange}>
                <Option label="학년을 선택해주세요" value="" />
                <Option value="1" />
                <Option value="2" />
                <Option value="3" />
              </Select>
              <div style={{ paddingBottom: 15 }} />
            </div>
            <div style={{ flex: 1 }}>
              <Card vertical={2}>
                <div {...css(styles.head)}>과목 선택하기</div>
              </Card>
              <Select name="selectSubject" onChange={onChange}>
                <Option label="과목을 선택해주세요" value="" />
                {subjects.map((subject, index) => (
                  <Option value={subject} key={index} />
                ))}
              </Select>
              <div style={{ paddingBottom: 15 }} />
            </div>
          </div>
        )}
      </Form.Consumer>
    </Form>
  );
}

export default withStyles(() => ({
  head: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 11,
    paddingTop: 11,
    fontWeight: 'bold',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: '#D9CBC7',
    borderRadius: '0.5rem',
  },
}))(BookstoreFilter);
