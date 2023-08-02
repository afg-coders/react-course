import axios from 'axios';

export const getTodo = async (page, limit) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
};

export const getOneTodo = async (id) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.data);
};

export const authenticateUser = async (email, password) => {
  return await axios
    .post(`http://localhost:8000/api/v1/auth/email/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};
