import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import {getBase64} from "../utils";
import { HASHTAGS, AUTHORS } from "../../data";
import { FormErrors } from '../FormErrors';
// console.log(AUTHORS)

export class NewsForm extends Component{
    state={
        title:``,
        text:``,
        description:``,
        photo:``,
        hashtags:[],
        authors:AUTHORS[0].name,
        formErrors: {title:``,text:``},
        titleValid:false,
        textValid:false,
        formValid:false,
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
        this.setState({ [name]: value }, 
            () => { this.validateField(name, value) });
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

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let textValid = this.state.textValid;
        switch(fieldName) {
            case 'title':
                titleValid = value.length >3 && value.length <20;
                console.log(titleValid)
                fieldValidationErrors.title = titleValid ? '' : ' is invalid';
                break;
            case 'text':
                textValid = value.length >= 10;
                fieldValidationErrors.text = textValid ? '': ' is too short';
                break;
            default:
                break;
            }
            this.setState({formErrors: fieldValidationErrors,
                            titleValid: titleValid,
                            textValid: textValid
                        }, this.validateForm);
        }
        validateForm() {
            this.setState({formValid: this.state.titleValid &&
                                    this.state.textValid});
        }

    render(){
        const {
            title,
            text,
            description,
            photo,
            hashtags,
            authors,
            formErrors,
            titleValid,
            textValid,
            formValid,
        } = this.state;

        return (
            <div className="news-form">
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
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