import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import Axios from 'axios';
import moment from 'moment';
import '../css/articles.css';

class Articles extends Component {
  state = {
    data: {},
    hasError: false
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

  componentDidCatch() {
    this.setState({ hasError: true });
  }

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

  handleVote = (type, id, vote) => {
    return api.changeVote(type, id, vote);
  };

  displayLoading = () => {
    return (
      <div className="main-content-area">
        <p className="loading-text">Please wait.. loading articles..</p>
      </div>
    );
  };

  displayArticles = (articles) => {
    return (
      <div className="main-content-area">
        <ul className="all-articles-list">
          {articles.map((article) => (
            <li className="article-list-item al-content" key={article._id}>
              <div className="article-title">
                <Link className="article-link" to={`/articles/${article._id}/`}>
                  <p className="article-list-title al-content al-text">
                    {article.title}
                  </p>
                </Link>
              </div>
              <div className="article-list-info">
                <p className="al-info-text">
                  Posted by{' '}
                  <span className="article-list-username">
                    {article.created_by.username}
                  </span>{' '}
                  on{' '}
                  <span className="article-list-date">
                    {moment(article.created_at).format('Do MMMM YYYY HH:mm')}{' '}
                    UTC
                  </span>{' '}
                  |{' '}
                  <Link
                    className="comment-link"
                    to={`/articles/${article._id}`}
                  >
                    <span className="article-list-comments">
                      Comments: {article.comments}
                    </span>
                  </Link>{' '}
                  |{' '}
                  <span className="article-list-votes">
                    Votes: {article.votes}
                  </span>{' '}
                  |{' '}
                  <span
                    className="article-list-upvote al-selector"
                    onClick={() => {
                      this.handleVote('articles', article._id, 'up');
                    }}
                  >
                    Upvote
                  </span>{' '}
                  /{' '}
                  <span
                    className="article-list-downvote al-selector"
                    onClick={() => {
                      this.handleVote('articles', article._id, 'down');
                    }}
                  >
                    Downvote
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
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
