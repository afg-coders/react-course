import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getUsers = async (page, limit) => {
  return await axios
    .get(`https://reqres.in/api/users?page=${page}&per_page=${limit}`)
    .then((response) => response.data);
};

export const getUser = async (id) => {
  return await axios
    .get(`https://reqres.in/api/users/${id}`)
    .then((response) => response.data);
};

export const createUser = async (name, job) => {
  return await axios
    .post(`https://reqres.in/api/users`, {
      name,
      job,
    })
    .then((response) => response.data);
};

export const useGetUsers = (page, limit) => {
  return useQuery({
    queryKey: ['fetch-users', page, limit],
    queryFn: () => getUsers(page, limit),
  });
};

export const useGetUser = (id) => {
  return useQuery({
    queryKey: ['fetch-user', id],
    queryFn: () => getUser(id),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => createUser(params?.name, params?.job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'fetch-users' });
    },
  });
};
