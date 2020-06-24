import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';

import Api from '../../../Api';
import EachBookSold from './eachBookSold';

class PublisherProfile extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      monthlyProfit: 0,
      monthlySold: 0,
    };
  }
  componentDidMount() {
    const publisherId = window.sessionStorage.getItem('publisherId');
    Api.get('publisher/profile/profit', { params: { publisherId } }).then(({ data }) => {
      this.setState({
        monthlyProfit: data.monthlyProfit,
        monthlySold: data.monthlySold,
      });
    });
  }

  render() {
    const { styles } = this.props;
    const { monthlyProfit, monthlySold } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} {...css(styles.container)}>
        <div
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
          {...css(styles.container)}
        >
          <div style={{ flex: 3 }}>
            <div
              style={{
                textAlign: 'center',
                display: 'tableCell',
                paddingTop: '2%',
                height: '10%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'rgb(247, 207, 192)',
              }}
            >
              (한달 기준)판매 부수(기본 : 총 {monthlySold}권 ){' '}
            </div>
            <div
              style={{
                flex: 5,
                height: 600,
                flexDirection: 'column',
                padding: 3,
                border: '2px rgb(247, 207, 192) solid',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EachBookSold />
            </div>
          </div>

          <div style={{ marginLeft: 10, flex: 1 }}>
            <div
              style={{
                textAlign: 'center',
                display: 'tableCell',
                paddingTop: '6%',
                height: '10%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: 'rgb(247, 207, 192)',
              }}
            >
              (한달 기준)예상 수익(기본 : 총)
            </div>

            <div
              style={{
                flex: 1,
                height: 600,
                flexDirection: 'column',
                padding: 3,
                border: '2px rgb(247, 207, 192) solid',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <h1>{monthlyProfit}원</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  body: {
    padding: unit * 4,
  },
}))(PublisherProfile);
