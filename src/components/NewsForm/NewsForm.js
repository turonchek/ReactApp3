import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import {getBase64} from "../utils";
import { HASHTAGS, AUTHORS } from "../../data";
// console.log(AUTHORS)

export class NewsForm extends Component{
    state={
        title:``,
        text:``,
        description:``,
        photo:``,
        hashtags:[],
        authors:AUTHORS[0].name,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = faker.datatype.uuid();
        const newsItem = {
            id,
            ...this.state,
        };
        this.props.onAddNewsItem(newsItem);
        console.log(newsItem)
    };

    handleChangeText = (e) => {
        const input = e.currentTarget;
        const { value, name } = input;
        this.setState({
            [name]: value,
        });
    };

    handleChangePhoto = (e) => {
        const file = e.currentTarget.files[0];
        getBase64(file, (base64) => {
            this.setState({
                photo: base64,
            });
        })
    };

    handleChangeAuthors = (e) => {
        const { value } = e.currentTarget;
        this.setState({
            authors: value,
        });
    };

    handleChangeHashtags = (e) => {
        const { value } = e.currentTarget;
        let newHashtag;
        // console.log(value)
        if (this.state.hashtags.includes(value)) {
            newHashtag = this.state.hashtags.filter(el => el !== value);
        } else {
            newHashtag = [...this.state.hashtags, value];
        }
        this.setState({
            hashtags: newHashtag,
        });
    };

    render(){
        const {
            title,
            text,
            description,
            photo,
            hashtags,
            authors,
        } = this.state;

        return (
            <div className="news-form">
                <form onSubmit={this.handleSubmit} className="news-form__cont">

                <div className="news-form__row">
                    <div className="news-form__label">
                        <label htmlFor="news-form-title">Title:</label>
                    </div>
                    <input value={title} onChange={this.handleChangeText} type="text" name="title" id="news-form-title"/>
                </div>

                <div className="news-form__row">
                    <div className="news-form__label">
                        <label htmlFor="news-form-description">Description:</label>
                    </div>
                    <textarea style={{width: '200px',height: '100px',}}value={description} onChange={this.handleChangeText} name="description" id="news-form-description"/>
                </div>

                <div className="news-form__row">
                    <div className="news-form__label">
                        <label htmlFor="news-form-title">Text:</label>
                    </div>
                    <textarea style={{width: '300px',height: '200px',}} value={text} onChange={this.handleChangeText} name="text" id="news-form-text"/>
                </div>

                

                <div className="news-form__row">
                    <div className="news-form__label">
                        <label htmlFor="news-form-photo">Photo:</label>
                    </div>   
                    {photo.length > 0 && (
                        <img style={{
                            width: '300px',
                            height: '200px',
                            objectFit: 'contain',
                        }} src={photo} alt=""/>
                    )}
                    <input type="file" accept=".jpeg,.png" onChange={this.handleChangePhoto} />
                </div>

                <div className="news-form__row">
                    <span>Author:</span>
                    <div>
                    {AUTHORS.map((authorsEl) => (
                        <label key={authorsEl.id}>
                        <input
                            checked={authors === authorsEl.name}
                            type="radio"
                            value={authorsEl.name}
                            onChange={this.handleChangeAuthors}
                        /><span>{authorsEl.name}</span>
                        </label>
                    ))}
                    </div>
                </div>

                <div className="news-form__row">
                    <span>Hashtags:</span>
                    <div>
                        {HASHTAGS.map((hashtagsEl) => (
                            <label key={hashtagsEl.id}>
                            <input
                                checked={hashtags.indexOf(hashtagsEl.word) !== -1}
                                type="checkbox"
                                value={hashtagsEl.word}
                                onChange={this.handleChangeHashtags}
                            /><span>{hashtagsEl.word}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Create item</button>
                </form>
            </div>
        );
    }
}

NewsForm.propTypes = {
    onAddNewsItem: PropTypes.func.isRequired,
};

NewsForm.defaultProps = {};