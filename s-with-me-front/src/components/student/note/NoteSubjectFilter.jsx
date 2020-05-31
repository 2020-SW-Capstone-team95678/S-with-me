import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';
import Button from '../../../common-ui/Button';

export default class NoteSubjectFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { folderList: [] };
  }

  handleSubjectFilter = subjectName => {
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestFilteredNoteList } = this.props;
    requestFilteredNoteList(studentId, 'SUBJECT', { subject: subjectName });
  };
  render() {
    return (
      <Form onSubmit={values => this.handleSubjectFilter(values.noteSubjectFilter)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select name="noteSubjectFilter" onChange={onChange} value={values['subject']}>
                <Option label="선택해 주세요" value="" />
                <Option label="국어" value="국어" />
                <Option label="수학" value="수학" />
                <Option label="영어" value="영어" />
                <Option label="과학" value="과학" />
              </Select>
              <Button type="submit" small>
                찾기
              </Button>
            </div>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
