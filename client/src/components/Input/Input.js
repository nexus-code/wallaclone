import React from 'react';
import { UserContext } from '../../context/UserContext'

export default class Input extends React.Component {
    handleOnKeyUp = (e) => {
        const value = e.target.value;

        if (e.keyCode === 13) {
            
            this.props.onChange({ target: { name: this.props.name, value: value } });

        }
    }

    render() {
        return <input type="text" 
                onKeyUp={this.handleOnKeyUp} 
                name={this.props.name} 
                placeholder={this.props.placeholder} 
                />
    }
}

Input.contextType = UserContext;
