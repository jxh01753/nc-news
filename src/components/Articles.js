import React, { Component } from 'react';
import Axios from '../../node_modules/axios';
import moment from 'moment';
import '../css/Articles.css';

/* There is an issue with comment count not loading when accessing the specific paths, look into this */

class Articles extends Component {
  state = {
    data: {}
  };

  componentDidMount = async () => {
    console.log(this.props);
    let data = await this.getArticleData(this.props.match.path);
    this.setState({
      data: data
    });
    console.log('Component Mounted!');
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.path !== this.props.match.path)
      this.getArticleData(this.props.match.path);
  };

  // The parameter for this should be the active topic, but for now as a placeholder just get any articles

  // Make sure to refactor this because it's going to look ugly.

  getArticleData = async (path) => {
    const coding = '/topics/5b4254e3e3de0311254b94b4/articles';
    const cooking = '/topics/5b4254e3e3de0311254b94b6/articles';
    const football = '/topics/5b4254e3e3de0311254b94b5/articles';
    let url = '';

    if (path === '/') url = '/articles';
    if (path === '/coding') url = coding;
    if (path === '/cooking') url = cooking;
    if (path === '/football') url = football;

    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api${url}`
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
                <p className="comment-count">Comments: {article.comments}</p>
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
