import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeNews, makeNewsItem } from '../../data';
import { NewsList } from '../NewsList/NewsList';

const news=makeNews();
// console.log(news)

export class NewsPage extends Component{
    state = {
        items: news,
        isEditing: false,
    };
    
    addNewsItem = (item) => {
        // console.log(item);
        this.setState({
        items: [
            item,
            ...this.state.items,
        ]
        });
    };
    
    removeNewsItem = (itemID) => {
        this.setState({
            items: this.state.items.filter((item) => item.id !== itemID),
        });
    };
    
    addRandomNewsItem = () => {
        this.addNewsItem(makeNewsItem())
    };
    
    render() {
        const { items, isEditing } = this.state;
    
        return (
        <div className="news-page">
            <div className="news-page__list">
            <div className="news-page__cations">
                <button onClick={this.addRandomNewsItem}>Add random item</button>
                <button onClick={() => this.setState({ isEditing: !isEditing })}>
                {isEditing ? 'Cancel' : 'Add item'}
                </button>
            </div>
            {/* {isEditing && (
                <MovieForm
                onAddMovie={this.addMovie}
                />
            )} */}
            <NewsList
                items={items}
                onRemoveNewsItem={this.removeNewsItem}
            />
            </div>
        </div>
        );
    }
}

NewsPage.propTypes = {};

NewsPage.defaultProps = {};