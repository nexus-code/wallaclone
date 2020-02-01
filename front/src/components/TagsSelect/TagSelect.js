import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as API from '../../services/AdService';

export default class TagSelect extends React.Component {

/*
    - Get tags from API and list on select
        · Select [options] must contain values with format {value: option, label: option}
    - Return selected value (selectedOption.value) on target object, to be user for parent handlers
    - isMulti is false by default, no mandatory (how indicates in prop types)
    - value contains values by default, as string or array
*/

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selectedOption: null 
        }

        this.handleChange = this.handleChange.bind(this);
        this.getTagsList();
    }
    
    getTagsList() {
        API.getTagsList().then(tags =>
            this.setState({
                tags
            })
        );
    }

    handleChange = selectedOption => {

        // Save and show seleceted value 
        // Pass that values to parent
        // Dont remove to understand this function: console.log('selectedOption', selectedOption);

        this.setState(
            { selectedOption }
        );

        // !isMulty
        if (!Array.isArray(selectedOption)) {

            // save and show single value on parent
            this.props.onChange({ target: { name: 'tags', value: selectedOption.value } });
        } else {

            // save and show array values on parent
            const arraySelectedOption = selectedOption.map(opt => opt.value)
            this.props.onChange({ target: { name: 'tags', value: arraySelectedOption } });
        }
    };

    
    render() {

        const isMulti = false || this.props.isMulti;

        const options = this.state.tags.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });

        let selectedValues = this.props.value;  

        if (this.props.value !== 'undefined' && Array.isArray(this.props.value))
            selectedValues = this.props.value.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });
        
        return (
            <>
                {
                    isMulti
                    &&
                    <Select
                        value={ selectedValues }
                        onChange={this.handleChange}
                        options={options}
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                }

                {
                    !isMulti
                    &&
                    <Select
                        value={ selectedValues }
                        onChange={this.handleChange}
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                }
            </>
        );
    }
}

TagSelect.propTypes = {
    // value: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    isMulti: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}