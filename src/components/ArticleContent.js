import React from 'react';
import moment from 'moment';
import VoteButton from './VoteButton';
import propTypes from 'prop-types';
import Article from './Article';

const ArticleContent = (props) => {
  return (
    <div className="article-content-area">
      <div className="thread-title">
        <p className="thread-article-title">
          {props.postContent.article.title}
        </p>
      </div>
      <div className="thread-body">
        <p className="thread-content">{props.postContent.article.body} </p>
        <div className="thread-info">
          <p className="thread-info-line ti">
            Created by{' '}
            <span className="thread-info-author">
              {props.postContent.article.created_by.username}
            </span>{' '}
            on{' '}
            <span className="thread-info-date">
              {' '}
              {moment(props.postContent.article.created_at).format(
                'Do MMMM YYYY HH:mm'
              )}
            </span>{' '}
            |<span className="thread-info-votes">
              {' '}
              Votes: {props.postContent.article.votes}
            </span>{' '}
            |{' '}
            <VoteButton
              voteType={'articles'}
              elementID={props.postContent.article._id}
              direction={'up'}
            />
            {' / '}
            <VoteButton
              voteType={'articles'}
              elementID={props.postContent.article._id}
              direction={'down'}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

ArticleContent.propTypes = {
  commentContent: propTypes.object,
  postContent: propTypes.object
};

export default ArticleContent;
