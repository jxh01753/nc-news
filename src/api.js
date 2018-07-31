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

export const deleteComment = async (comment_id) => {
  const response = await Axios.delete(`${url}/comments/${comment_id}`);
  return response;
};

export const fetchTopics = async () => {
  const response = await Axios.get(`${url}/topics`);
  return response;
};

// export const fetchArticles = async (request) => {
//   const response = await Axios.get(`/${url}/${request}`);
//   return response;
// };
