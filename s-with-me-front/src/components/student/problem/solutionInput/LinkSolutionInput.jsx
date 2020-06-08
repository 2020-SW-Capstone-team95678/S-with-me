import React, { PureComponent } from 'react';
import Api from '../../../../Api';
import { Consumer as Modal } from '../../../../common-ui/Modal/context';

import Text from '../../../../common-ui/Text';
import Select, { Option } from '../../../../common-ui/Select';
import SelectSubChapter from '../../libarary/SelectSubChapter';
import { PREVIEW_PROBLEM } from '../../../../constants/modals';

export default class LinkSolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { myProblemListForLink: [], subChapterId: 0, shouldUpdate: false };
    this.handleLinkSolution = this.handleLinkSolution.bind(this);
  }
  componentDidMount() {
    const { values, myBookId, requestChapterList } = this.props;
    requestChapterList({ myBookId: myBookId });
    this.setState({ subChapterId: values.selectSubChapterId });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.values.selectSubChapterId !== prevState.subChapterId) {
      return { shouldUpdate: true };
    }
    return { shouldUpdate: false };
  }

  componentDidUpdate() {
    const { values, myBookId } = this.props;
    if (this.state.shouldUpdate && values.selectSubChapterId) {
      Api.get(`/student/library/my-book/${myBookId}/main-chapter/sub-chapter/my-problems`, {
        params: { subChapterId: values.selectSubChapterId },
      }).then(({ data }) => {
        this.setState({ subChapterId: values.selectSubChapterId });
        this.setState({ myProblemListForLink: data });
      });
    }
  }
  handleLinkSolution(selectedId) {
    const { id, setMyNewLinkSolution, isNote, setLinkSolutionId } = this.props;
    if (isNote) setMyNewLinkSolution(id, selectedId);
    else setLinkSolutionId(id, selectedId);
  }
  render() {
    const { onChange, values, chapterList } = this.props;
    const { myProblemListForLink } = this.state;
    return (
      <div style={{ padding: 5, paddingTop: 30 }}>
        <Text>참고할 문제를 선택해주세요!</Text>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 2 }}>
            <Select name="selectMainChapterId" onChange={onChange}>
              <Option label="선택해 주세요" value="" />
              {chapterList.map(({ mainChapter }, index) => (
                <Option
                  key={index}
                  label={mainChapter.mainChapterName}
                  value={mainChapter.mainChapterId}
                />
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
                  <Option label="선택해 주세요" value="0" />
                  {myProblemListForLink.map((myProblem, index) => {
                    return <Option key={index} label={index + 1} value={myProblem.myProblemId} />;
                  })}
                </Select>
                <div
                  onClick={() => {
                    openModal(PREVIEW_PROBLEM, {
                      myProblemId: values.selectMyProblem,
                    });
                  }}
                  style={{
                    border: '1px solid',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 'small',
                    padding: 3,
                  }}
                >
                  미리 보기
                </div>
              </div>
            )}
          </Modal>
          <div
            onClick={() => this.handleLinkSolution(values.selectMyProblem)}
            style={{
              flex: 1,
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'small',
              padding: 3,
            }}
          >
            선택
          </div>
        </div>
      </div>
    );
  }
}
