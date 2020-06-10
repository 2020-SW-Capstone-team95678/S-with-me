import {SketchField, Tools} from 'react-sketch';
import React from 'react';

class SketchFieldDemo extends React.Component {

    
     render() {
        return (
 
            <SketchField width='100%' 
                         height='50%' 
                         tool={Tools.Pencil} 
                         lineColor='black'
                         lineWidth={3}/>
        )
     }
}export default SketchFieldDemo;
