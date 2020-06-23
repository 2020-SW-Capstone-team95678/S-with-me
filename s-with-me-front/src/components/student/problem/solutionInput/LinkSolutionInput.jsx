import React, { PureComponent } from 'react';
import Api from '../../../../Api';

import { Menu, Checkbox } from 'semantic-ui-react';
import Select, { Option } from '../../../../common-ui/Select';
import SelectSubChapter from '../../libarary/SelectSubChapter';
import ProblemPreviewPage from '../ProblemPreviewPage';

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
      <div>
        <ProblemPreviewPage myProblemId={values.selectMyProblem} />
        <Menu attached="top">
          <Menu.Item>
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
          </Menu.Item>
          <Menu.Item>
            <SelectSubChapter
              chapterList={this.props.chapterList}
              mainChapterId={values.selectMainChapterId}
              onChange={onChange}
            />
          </Menu.Item>
          <Menu.Item>
            <Select name="selectMyProblem" onChange={onChange}>
              <Option label="선택해 주세요" value="0" />
              {myProblemListForLink.map((myProblem, index) => {
                return <Option key={index} label={index + 1} value={myProblem.myProblemId} />;
              })}
            </Select>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Checkbox onClick={() => this.handleLinkSolution(values.selectMyProblem)} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
