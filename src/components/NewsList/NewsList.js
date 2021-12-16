import React, {Component} from "react";
import PropTypes from 'prop-types';
import { NewsItem } from "../NewsItem/NewsItem";

export class NewsList extends Component{
    render(){
        const {items, onRemoveNewsItem} = this.props;
        // console.log(items)
        return (
            <div className="news-list">
                <div className="news-list__cont">

                {items.map(el => (
                    <div key={el.id} className="news-list__el">
                        <NewsItem
                            onRemoveNewsItem={onRemoveNewsItem}
                            newsItem={el}
                        />
                    </div>
                ))}

                </div>
            </div>
        );
    }
}

NewsList.propTypes = {
    items: PropTypes.array,
    onRemoveNewsItem: PropTypes.func.isRequired,
};

NewsList.defaultProps = {
    items: [],
};