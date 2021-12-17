import React, { Component } from "react";
import PropTypes from 'prop-types';

export class NewsSearch extends Component {

    handleChangeSearch =(e)=>{
        let {onChangeSearch}=this.props;
        let {currentTarget}=e;
        onChangeSearch(currentTarget.value);
    }

    render(){
        const { search } = this.props;
        return (
            <div>
                <label>
                    <input 
                    type="text" 
                    value={search} 
                    onChange={this.handleChangeSearch}/>
                </label>
            </div>
        )
    }
}

NewsSearch.PropTypes={
    search:PropTypes.string.isRequired,
    onChangeSearch:PropTypes.func.isRequired
}