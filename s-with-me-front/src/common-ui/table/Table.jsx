import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../withStyles';

class Table extends PureComponent {
  static propTypes = {
    ...withStylesPropTypes,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { styles, children } = this.props;
    return <table {...css(styles.table)}>{children}</table>;
  }
}

export default withStyles(({ color, unit }) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
}))(Table);
