import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import Axios from 'axios';
import Article from './Article';
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
          {articles.map((article) => <Article content={article} />)}
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
