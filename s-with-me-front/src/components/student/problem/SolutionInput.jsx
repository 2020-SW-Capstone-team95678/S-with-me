import React, { PureComponent } from 'react';
import Api from '../../../Api';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import Text from '../../../common-ui/Text';
import Select, { Option } from '../../../common-ui/Select';

import SelectSubChapter from '../libarary/SelectSubChapter';
import { PREVIEW_PROBLEM } from '../../../constants/modals';

export default class SolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { file: '', previewURL: '', myProblemListForLink: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
  }
  componentDidMount() {
    const { myBookId, requestChapterList } = this.props;
    Api.get('/student/library/my-book/book-id', { params: { myBookId: myBookId } }).then(
      ({ data }) => {
        requestChapterList({ bookId: data });
      },
    );
  }

  componentDidUpdate() {
    const { values } = this.props;
    if (values.selectSubChapterId) {
      Api.get('/student/library/my-book/main-chapter/sub-chapter/my-problems', {
        params: { subChapterId: values.selectSubChapterId },
      }).then(({ data }) => this.setState({ myProblemListForLink: data }));
    }
  }
  handleChange(e) {
    const { setMySolution, id } = this.props;
    e.preventDefault();
    setMySolution(id, e.target.value);
  }
  handleFileOnChange(event) {
    const { setMySolution, id } = this.props;
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
      setMySolution(id, reader.result);
    };
    reader.readAsDataURL(file);
  }
  render() {
    const { solutionFilterType, onChange, values, chapterList } = this.props;
    const { file, previewURL, myProblemListForLink } = this.state;
    let solution_preview = null;
    if (file) {
      solution_preview = (
        <img className="profile_preview" src={previewURL} height="100" alt="solution_preview" />
      );
    }
    if (solutionFilterType === 'text') {
      return (
        <div style={{ padding: '5px' }}>
          <textarea
            type="text"
            onChange={this.handleChange}
            name="textSolutionInput"
            style={{
              width: '100%',
              height: '110px',
              resize: 'none',
            }}
          />
        </div>
      );
    } else if (solutionFilterType === 'img') {
      return (
        <div style={{ padding: '5px' }}>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="mySolutionImage"
            onChange={this.handleFileOnChange}
          />
          {solution_preview}
        </div>
      );
    } else {
      return (
        <div style={{ padding: '5px' }}>
          <Text>참고할 문제를 선택해주세요!</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Select name="selectMainChapterId" onChange={onChange}>
                <Option label="선택해 주세요" value="" />
                {chapterList.map(({ mainChapter }) => (
                  <Option label={mainChapter.mainChapterName} value={mainChapter.mainChapterId} />
                ))}
              </Select>
            </div>
            <div style={{ flex: 1 }}>
              <SelectSubChapter
                chapterList={this.props.chapterList}
                mainChapterId={values.selectMainChapterId}
                onChange={onChange}
              />
            </div>
            <Modal>
              {({ openModal }) => (
                <div style={{ flex: 2, display: 'flex' }}>
                  <Select name="selectMyProblem" onChange={onChange}>
                    <Option label="선택해 주세요" value="" />
                    {myProblemListForLink.map((myProblem, index) => (
                      <Option
                        key={index}
                        label={myProblem.myProblemId}
                        value={myProblem.problemId}
                      />
                    ))}
                  </Select>
                  <div
                    onClick={() =>
                      openModal(PREVIEW_PROBLEM, {
                        problemId: values.selectMyProblem,
                        // myAnswer: values.selectMyProblem.myAnswer,
                        // mySolution: values.selectMyProblem.mySolution,
                      })
                    }
                    style={{
                      padding: 1,
                      border: '1px solid',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    문제 미리 보기
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      );
    }
  }
}
