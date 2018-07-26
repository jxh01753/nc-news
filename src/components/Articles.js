import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Axios from '../../node_modules/axios';
import moment from 'moment';
import '../css/Articles.css';

/* There is an issue with comment count not loading when accessing the specific paths, look into this */

class Articles extends Component {
  state = {
    data: {}
  };

  componentDidMount = async () => {
    let data = await this.getArticleData(this.props.match.path);
    this.setState({
      data: data
    });
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.url !== this.props.match.url) {
      this.getArticleData().then((data) => {
        this.setState({
          data: data
        });
      });
    }
  };

  getArticleData = async () => {
    let request = '';

    !this.props.match.params.topic_id
      ? (request = 'articles')
      : (request = `topics/${this.props.match.params.topic_id}/articles`);

    const { data } = await Axios.get(
      `https://jxh01753-nc-news.herokuapp.com/api/${request}`
    );
    return data;
  };

  displayArticles = (articles) => {
    return (
      <div className="main-window">
        <div className="articles">
          {articles.map((article) => (
            <div className="article-card">
              <div className="article-content" key={article._id}>
                <Link className="article-link" to={`/articles/${article._id}/`}>
                  <p className="article-title">{article.title}</p>
                </Link>
                <p className="article-author">
                  Created by user: {article.created_by.username} on
                </p>
                <p className="article-date">
                  {moment(article.created_at).format('Do MMMM YYYY HH:mm')}
                </p>
                <Link
                  className="comments-link"
                  to={`/articles/${article._id}/`}
                >
                  <p className="comment-count">Comments: {article.comments}</p>
                </Link>
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
