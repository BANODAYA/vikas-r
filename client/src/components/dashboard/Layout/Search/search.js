import React from 'react';
import '../Search/search.css';
import PropTypes from 'prop-types';



class search extends React.Component{
    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            activeOption: 0,
            filteredOptions: [],
            showOptions: false
        };
    }



    handleOnInputChange = (event) => {
        const { options } = this.props;
        const query = event.currentTarget.value;
        const filteredOptions = options.filter(
            (optionName) =>
                optionName.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
        this.setState({
            query:event.currentTarget.value,
            loading: true,
            message: '',
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            

        })
    };

    onClick = (event) => {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            query: event.currentTarget.innerText
        });
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                query: filteredOptions[activeOption]
            });
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                console.log(activeOption);
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };



    render() {
        const {
            onChange,
            onClick,
            onKeyDown,

            state: { activeOption, filteredOptions, showOptions, query }
        } = this;
        let optionList;
        if (showOptions && query) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className="options">
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={optionName} onClick={onClick}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                optionList = (
                    <div className="no-options">
                        <em>No Option!</em>
                    </div>
                );
            }
        }


        return (
            <div className="container">
                <h2 className="heading">Play Smart in Searching Home</h2>
                <label className="search-label" htmlFor="search-input">
                    <input type="text" value={query} id="search-input" placeholder="City, Address Or zip..." onChange={this.handleOnInputChange} onKeyDown={onKeyDown}  />
                    <i className="fa fa-search search-icon" />


                </label>
                {optionList}
            </div>
            
        );
    }
}

export default search;