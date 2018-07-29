import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
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

  handleVote = async (articleID, vote) => {
    const voteRequest = await Axios.put(
      `https://jxh01753-nc-news.herokuapp.com/api/articles/${articleID}?vote=${vote}`
    );
    console.log(voteRequest);
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
            <li className="article-list-item al-content">
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
                      this.handleVote(article._id, 'up');
                    }}
                  >
                    Upvote
                  </span>{' '}
                  /{' '}
                  <span
                    className="article-list-downvote al-selector"
                    onClick={() => {
                      this.handleVote(article._id, 'down');
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

/*
<li className="article-list-item al-content">
            <div className="article-title">
              <a href="https://www.google.com">
                <p className="article-list-title al-content al-text">
                  Atlassian announces new partnership with Slack, will
                  discontinue Hipchat and Stride.
                </p>
              </a>
            </div>
            <div className="article-list-info">
              <p className="article-list-title al-content al-text">
                Posted by{' '}
                <span className="article-list-username">jessjelly</span> on{' '}
                <span className="article-list-date">
                  12th September 2018 21:32
                </span>{' '}
                | <span className="article-list-comments">Comments: 12</span> |{' '}
                <span className="article-list-votes">Votes: 12</span> |{' '}
                <span className="article-list-upvote">Upvote</span> /{' '}
                <span className="article-list-downvote">Downvote</span>
              </p>
            </div>
          </li>
*/
