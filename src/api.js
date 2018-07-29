import Axios from 'axios';

const url = 'https://jxh01753-nc-news.herokuapp.com/api';

export const fetchPostData = async (article_id) => {
  const response = await Axios.get(`${url}/articles/${article_id}`);
  return response.data;
};

export const fetchCommentData = async (article_id) => {
  const response = await Axios.get(`${url}/articles/${article_id}/comments`);
  return response.data;
};

export const changeVote = async (type, id, vote) => {
  const response = await Axios.put(`${url}/${type}/${id}?vote=${vote}`);
  return response;
};

export const submitComment = async (data, article_id) => {
  const response = await Axios.post(
    `${url}/articles/${article_id}/comments`,
    data
  );
  return response;
};
