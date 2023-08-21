import { useMutation } from '@tanstack/react-query';
import { postRequest } from '../utils/http';

export const authenticateUser = async (email, password) => {
  return postRequest('auth/signin', {
    email,
    password,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (params) => authenticateUser(params?.email, params?.password),
  });
};
