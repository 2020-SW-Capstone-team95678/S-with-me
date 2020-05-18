import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Card from '../../../common-ui/Card';
import Button from '../../../common-ui/Button';
import Heading from '../../../common-ui/Heading';
import InlineList from '../../../common-ui/InlineList';

export default class InexListItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    monthlySales: PropTypes.number,
    // coverSource: PropTypes.node,
  };

  render() {
    const { active, title, onClick } = this.props;
    return (
      <Card vertical={4} horizontal={4}>
        {/* cover */}
        <div className={active ? "listItemActive" : "listItem"}
        onClick={onClick}
        >
          <div className="title">{title? title: "목차"}</div>
        </div>
        
      </Card>
    );
  }
}