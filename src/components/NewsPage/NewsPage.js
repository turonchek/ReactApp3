import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeNews, makeNewsItem } from '../../data';
import { NewsList } from '../NewsList/NewsList';
import { NewsForm } from '../NewsForm/NewsForm';
import { NewsSearch } from '../NewsSearch';

const news=makeNews();
// console.log(news)

export class NewsPage extends Component{
    state = {
        items: news,
        isEditing: false,
        isSearch: false,
        search:"",
    };

    handleChangeSearch =(newSearch)=>{
        this.setState({
            search:newSearch,
        });
    }

    addNewsItem = (item) => {
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
        const { items, isEditing,isSearch, search} = this.state;
        // console.log(search)
        const itemsFilter =items.filter(el => {
            if(el.title.toLowerCase().indexOf(search.toLowerCase())<0 && el.text.toLowerCase().indexOf(search.toLowerCase())<0 && el.description.toLowerCase().indexOf(search.toLowerCase())<0) return false;
            return true;
        })
    
        return (
        <div className="news-page">
            <div className="news-page__list">
            <div className="news-page__cations">
                <button onClick={this.addRandomNewsItem}>Add random item</button>
                <button onClick={() => this.setState({ isEditing: !isEditing })}>
                {isEditing ? 'Cancel' : 'Add item'}
                </button>
                <button onClick={() => this.setState({ isSearch: !isSearch })}>
                {isSearch ? 'Cancel' : 'Search'}
                </button>
            </div>
            {isEditing && (
                <NewsForm
                    onAddNewsItem={this.addNewsItem}
                />
            )}
            {(isSearch &&
                <NewsSearch
                    search={search}
                    onChangeSearch={this.handleChangeSearch}
                />
            )}
            <NewsList
                items={itemsFilter}
                onRemoveNewsItem={this.removeNewsItem}
            />
            </div>
        </div>
        );
    }
}

NewsPage.propTypes = {};

NewsPage.defaultProps = {};