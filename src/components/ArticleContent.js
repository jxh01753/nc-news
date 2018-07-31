import React from 'react';
import moment from 'moment';

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
            <span
              className="thread-info-upvote"
              onClick={() =>
                this.handleVote('articles', props.postContent.article._id, 'up')
              }
            >
              Upvote
            </span>{' '}
            /{' '}
            <span
              className="thread-info-downvote"
              onClick={() =>
                this.handleVote(
                  'articles',
                  props.postContent.article._id,
                  'down'
                )
              }
            >
              Downvote
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
