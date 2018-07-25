import React, { Component } from 'react';
import Axios from '../../node_modules/axios';
import moment from 'moment';
import '../css/Articles.css';

class Articles extends Component {
  state = {
    data: {}
  };

  componentDidMount = async () => {
    let data = await this.getArticleData();
    this.setState({
      data: data
    });
    console.log('Component Mounted!');
    console.log(this.state.data);
  };

  // The parameter for this should be the active topic, but for now as a placeholder just get any articles
  getArticleData = async () => {
    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/articles`
    );
    return data;
  };

  displayArticles = (articles) => {
    return (
      <div className="main-window">
        <div className="articles">
          {articles.map((article) => (
            <div className="article-card">
              <div className="article-content">
                <p className="article-title">{article.title}</p>
                <p className="article-author">
                  Created by user: {article.created_by.username} on
                </p>
                <p className="article-date">
                  {moment(article.created_at).format('Do MMMM YYYY HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  displayLoading = () => {
    return (
      <div className="main-window">
        <div className="loading-screen">
          <p className="loading-title">Loading...</p>
        </div>
      </div>
    );
  };

  render() {
    return !this.state.data.articles
      ? this.displayLoading()
      : this.displayArticles(this.state.data.articles);
  }
}

export default Articles;
