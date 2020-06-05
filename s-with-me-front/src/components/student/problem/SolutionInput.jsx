import React, { PureComponent } from 'react';
import Api from '../../../Api';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Select, { Option } from '../../../common-ui/Select';

import SelectSubChapter from '../libarary/SelectSubChapter';
import { PREVIEW_PROBLEM } from '../../../constants/modals';

class SolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { file: '', previewURL: '', myProblemListForLink: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
    this.handleLinkSolution = this.handleLinkSolution.bind(this);
  }
  componentDidMount() {
    const { myBookId, requestChapterList, solutionType } = this.props;
    if (solutionType === 'link') requestChapterList({ myBookId: myBookId });
  }

  componentDidUpdate() {
    const { values, myBookId } = this.props;
    if (values.selectSubChapterId) {
      Api.get(`/student/library/my-book/${myBookId}/main-chapter/sub-chapter/my-problems`, {
        params: { subChapterId: values.selectSubChapterId },
      }).then(({ data }) => this.setState({ myProblemListForLink: data }));
    }
  }
  handleChange(e) {
    const { setTextSolution, setSolutionType, id, solutionType } = this.props;
    e.preventDefault();
    if (solutionType !== 'text') setSolutionType(id, 'text');
    setTextSolution(id, e.target.value);
  }
  handleFileOnChange(event) {
    const { setImageSolution, id } = this.props;
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
      setImageSolution(id, reader.result);
    };
    reader.readAsDataURL(file);
  }
  handleLinkSolution(selectedId) {
    const { id, setLinkSolutionId } = this.props;
    setLinkSolutionId(id, selectedId);
  }
  render() {
    const { solutionType, onChange, values, chapterList, styles } = this.props;
    const { file, previewURL, myProblemListForLink } = this.state;
    let solution_preview = null;
    if (file) {
      solution_preview = (
        <img className="profile_preview" src={previewURL} height="100" alt="solution_preview" />
      );
    }
    if (solutionType === 'link') {
      return (
        <div style={{ padding: 5, paddingTop: 30 }}>
          <Text>참고할 문제를 선택해주세요!</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 2 }}>
              <Select name="selectMainChapterId" onChange={onChange}>
                <Option label="선택해 주세요" value="" />
                {chapterList.map(({ mainChapter }) => (
                  <Option label={mainChapter.mainChapterName} value={mainChapter.mainChapterId} />
                ))}
              </Select>
            </div>
            <div style={{ flex: 2 }}>
              <SelectSubChapter
                chapterList={this.props.chapterList}
                mainChapterId={values.selectMainChapterId}
                onChange={onChange}
              />
            </div>
            <Modal>
              {({ openModal }) => (
                <div style={{ flex: 3, display: 'flex' }}>
                  <Select name="selectMyProblem" onChange={onChange}>
                    <Option label="선택해 주세요" value="" />
                    {myProblemListForLink.map((myProblem, index) => {
                      return <Option key={index} label={index} value={myProblem.myProblemId} />;
                    })}
                  </Select>
                  <div
                    onClick={() => {
                      openModal(PREVIEW_PROBLEM, {
                        myProblemId: values.selectMyProblem,
                      });
                    }}
                    {...css(styles.linksolution)}
                  >
                    미리 보기
                  </div>
                </div>
              )}
            </Modal>
            <div
              onClick={() => this.handleLinkSolution(values.selectMyProblem)}
              {...css(styles.linksolution)}
            >
              선택
            </div>
          </div>
        </div>
      );
    } else if (solutionType === 'img') {
      return (
        <div style={{ padding: '5px', paddingTop: 5 }}>
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
        <div style={{ padding: '5px', paddingTop: 5 }}>
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
    }
  }
}

export default withStyles(() => ({
  linkSolution: {
    flex: 1,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'small',
    padding: 3,
  },
}))(SolutionInput);
