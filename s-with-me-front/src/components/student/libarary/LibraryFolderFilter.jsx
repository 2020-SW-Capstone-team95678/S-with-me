import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import InlineList from '../../../common-ui/InlineList';
import Select, { Option } from '../../../common-ui/Select';
import Button from '../../../common-ui/Button';

export default class LibraryFolderFilter extends PureComponent {
  render() {
    return (
      <Form onSubmit={(values) => console.log(values)}>
        <Form.Consumer>
          {({ onChange, values }) => (
            <InlineList spacingBetween={1}>
              {/* <Select name="libFilter" onChange={onChange} values={values['libFilter']}> */}
              <Select name="libFilter" onChange={onChange}>
                <Option label="정렬 방식을 선택하세요" value="" />
                <Option label="과목별로 분류" value="subject" />
                <Option label="폴더별로 분류" value="folder" />
                <Option label="구입순으로 정렬" value="latest" />
                <Option label="가나다순으로 정렬" value="alphabet" />
              </Select>
              <Button>폴더 생성</Button>
            </InlineList>
          )}
        </Form.Consumer>
      </Form>
    );
  }
}
