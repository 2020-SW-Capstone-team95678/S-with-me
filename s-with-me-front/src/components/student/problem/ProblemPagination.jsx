import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common-ui/Button';
import InlineList from '../../../common-ui/InlineList';

export default class ProblemPagination extends PureComponent {
  static propTypes = {
    hasNext: PropTypes.bool,
    pageNumber: PropTypes.number,
    loading: PropTypes.bool,
    requestMyProblemList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }

  handleNextPress() {
    const { requestMyProblemList, id, pageNumber } = this.props;
    requestMyProblemList(id, { page: pageNumber * 1 + 1 }, pageNumber * 1 + 1);
  }

  handlePrevPress() {
    const { requestMyProblemList, id, pageNumber } = this.props;
    requestMyProblemList(id, { page: pageNumber * 1 - 1 }, pageNumber * 1 - 1);
  }
  render() {
    const { loading, pageNumber, hasNext } = this.props;
    const prevDisabled = loading || pageNumber <= 1;
    const nextDisabled = loading || !hasNext;
    return (
      <InlineList align="right">
        <Button disabled={prevDisabled} onPress={this.handlePrevPress}>
          이전
        </Button>
        <Button disabled={nextDisabled} onPress={this.handleNextPress}>
          다음
        </Button>
      </InlineList>
    );
  }
}
