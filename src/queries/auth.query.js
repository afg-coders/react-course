import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const authenticateUser = async (email, password) => {
  return await axios
    .post(`https://reqres.in/api/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (params) => authenticateUser(params?.email, params?.password),
  });
};
