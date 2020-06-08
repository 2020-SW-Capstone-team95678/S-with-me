import React from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';
import { subjects } from '../../../constants/subjects';

import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import Button from '../../../common-ui/Button';
import { Button as SemanticButton } from 'semantic-ui-react';
import Select, { Option } from '../../../common-ui/Select';

function BookstoreFilter(props) {
  const { styles, requestBookList, requestAdBookList, setBookstoreFilter } = props;
  const grade = window.sessionStorage.getItem('grade');
  const handleFilter = values => {
    if (values.selectGrade && values.selectSubject) {
      setBookstoreFilter('BOTH', { subject: values.selectSubject, grade: values.selectGrade });
      requestBookList(values.selectGrade, values.selectSubject);
      requestAdBookList(values.selectGrade, values.selectSubject);
    } else if (values.selectGrade) {
      setBookstoreFilter('GRADE', { grade: values.selectGrade });
      requestBookList(values.selectGrade);
      requestAdBookList(values.selectGrade);
    } else if (values.selectSubject) {
      setBookstoreFilter('SUBJECT', { subject: values.selectSubject });
      requestBookList(grade, values.selectSubject);
      requestAdBookList(grade, values.selectSubject);
    } else {
      requestBookList(grade);
      requestAdBookList(grade);
    }
  };
  const handleSearch = stringValue => {
    const { requestSearchResultList, setBookstoreFilter } = props;
    setBookstoreFilter('SEARCH', stringValue);
    requestSearchResultList(stringValue);
  };
  return (
    <div style={{ flex: 1 }} {...css(styles.box)}>
      <Form onSubmit={values => handleSearch(values.bookstoreSearch)}>
        <Form.Consumer>
          {({ onChange }) => (
            <React.Fragment>
              <SemanticButton color="orange" fluid basic>
                텍스트로 검색하기
              </SemanticButton>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex' }} {...css(styles.head)}>
                  <Input onChange={onChange} name="bookstoreSearch" placeholder="Search..." />
                  <Button xsmall>Go!</Button>
                </div>
              </div>
            </React.Fragment>
          )}
        </Form.Consumer>
      </Form>
      <Form onSubmit={values => handleFilter(values)}>
        <Form.Consumer>
          {({ onChange }) => (
            <React.Fragment>
              <SemanticButton color="orange" fluid basic>
                학년 또는 과목으로 검색하기
              </SemanticButton>
              <div style={{ flex: 1 }}>
                <div {...css(styles.head)}>학년 선택하기</div>
                <Select name="selectGrade" onChange={onChange}>
                  <Option label="학년을 선택해주세요" value="" />
                  <Option value="1" />
                  <Option value="2" />
                  <Option value="3" />
                </Select>
              </div>
              <div style={{ flex: 1 }}>
                <div {...css(styles.head)}>과목 선택하기</div>
                <Select name="selectSubject" onChange={onChange}>
                  <Option label="과목을 선택해주세요" value="" />
                  {subjects.map((subject, index) => (
                    <Option value={subject} key={index} />
                  ))}
                </Select>
              </div>
            </React.Fragment>
          )}
        </Form.Consumer>
      </Form>
    </div>
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
