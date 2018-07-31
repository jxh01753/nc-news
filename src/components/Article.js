import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import VoteButton from './VoteButton';

const Article = (props) => {
  return (
    <li className="article-list-item al-content">
      <div className="article-title">
        <Link className="article-link" to={`/articles/${props.content._id}/`}>
          <p className="article-list-title al-content al-text">
            {props.content.title}
          </p>
        </Link>
      </div>
      <div className="article-list-info">
        <p className="al-info-text">
          {'Posted by '}
          <span className="article-list-username">
            {props.content.created_by.username}
          </span>
          {' on '}
          <span className="article-list-date">
            {moment(props.content.created_at).format('Do MMMM YYYY HH:mm')}
            {' UTC '}
          </span>
          {' | '}
          <Link className="comment-link" to={`/articles/${props.content._id}`}>
            <span className="article-list-comments">
              Comments: {props.content.comments}
            </span>
          </Link>
          {' | '}
          <span className="article-list-votes">
            Votes: {props.content.votes}
          </span>
          {' | '}
          <VoteButton
            voteType={'articles'}
            elementID={props.content._id}
            direction={'up'}
          />
          {' | '}
          <VoteButton
            voteType={'articles'}
            elementID={props.content._id}
            direction={'down'}
          />
        </p>
      </div>
    </li>
  );
};

export default Article;
