import React, {Component} from "react";
import PropTypes from 'prop-types';
import { HASHTAGS, AUTHORS } from "../../data";

export class NewsItem extends Component{
    render(){
        const {newsItem: {
                id,
                title,
                text,
                description,
                photo,
                hashtags,
                authors,
            },onRemoveNewsItem} = this.props;

    const authorsData = AUTHORS.filter((srcAuthor) => {
            return authors.indexOf(srcAuthor.id) !== -1;
    });

    const authorsDataForm = AUTHORS.filter((srcAuthor) => {
        return authors.indexOf(srcAuthor.name) !== -1;
    });

    const hashtagsData = HASHTAGS.filter((srcHashtags) => {
            return hashtags.indexOf(srcHashtags.id) !== -1;
    });

    const hashtagsDataForm = HASHTAGS.filter((srcHashtags) => {
        return hashtags.indexOf(srcHashtags.word) !== -1;
    });

        return(
            <div className="news-item">
                <h1>{title}</h1>
                <div><img style={{
                    width: '300px',
                    height: '200px',
                    objectFit: 'cover',
                    }} src={photo} alt={title}/></div>
                    <div><b>Description: </b><div dangerouslySetInnerHTML={{ __html: description }} /></div>
                    <div><b>Main text: </b><div dangerouslySetInnerHTML={{ __html: text }} /></div>
                    <div><b>Author: </b>{authorsData.length===0 ? authorsDataForm.map(a => a.name) : authorsData.map(a => a.name)}</div>
                    <div><b>Hashtags: </b>{hashtagsData.length===0 ? hashtagsDataForm.map(h => h.word).join(', ') : hashtagsData.map(h => h.word).join(', ')}</div>
                    <div><button onClick={() => onRemoveNewsItem(id)}>Delete this item</button></div>
            </div>
        );
    }
}

NewsItem.propTypes = {
    newsItem: PropTypes.shape({
        authors:PropTypes.arrayOf(PropTypes.string),
        description:PropTypes.string,
        hashtags:PropTypes.arrayOf(PropTypes.string),
        id:PropTypes.string,
        photo:PropTypes.string,
        text:PropTypes.string,
        title:PropTypes.string,
    }).isRequired,
    onRemoveNewsItem: PropTypes.func.isRequired,
};

NewsItem.defaultProps = {};