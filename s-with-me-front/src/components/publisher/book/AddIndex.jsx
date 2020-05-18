import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, css, withStylesPropTypes } from '../../../common-ui/withStyles';
import Heading from '../../../common-ui/Heading';

import AppNav, { HEIGHT } from '../AppNav';
import GradeList from './GradeList';
import Button from '../../../common-ui/Button';
import Spacing from '../../../common-ui/Spacing';
import Input from '../../../common-ui/Input';
import IndexOverview from './IndexList';

class AddIndex extends PureComponent{
    
    render() {
        const {addIndex}=this.props;
        const {title} = addIndex;
        return(
            <div className="addInpex">
                <input className = "indexName" value={title}/>
                <textarea className = "note"></textarea>
            </div>

        );
    }


}
export default AddIndex;