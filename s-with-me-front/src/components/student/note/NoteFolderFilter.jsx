import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Select, { Option } from '../../../common-ui/Select';
import { Button } from 'semantic-ui-react';
import Api from '../../../Api';

export default class NoteFolderFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { folderList: [] };
  }

  componentDidMount() {
    const studentId = window.sessionStorage.getItem('studentId');
    Api.get('student/library/folder/display', {
      params: { studentId: studentId },
    }).then(({ data }) => this.setState({ folderList: data }));
  }

  handleFolderFilter = folderId => {
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestFilteredNoteList, setNoteFilter } = this.props;
    requestFilteredNoteList(studentId, 'FOLDER', { folderId: folderId });
    setNoteFilter('FOLDER', folderId);
  };
  render() {
    const { folderList } = this.state;
    return (
      <Form onSubmit={values => this.handleFolderFilter(values.noteFolderFilter)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select name="noteFolderFilter" onChange={onChange} value={values['folder']}>
                <Option label="선택해 주세요" value="" />
                {folderList.map(({ folderId, folderName }) => (
                  <Option label={folderName} value={folderId} key={folderId} />
                ))}
              </Select>
              <Button size="tiny" icon="search" circular basic color="black" />
            </div>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
