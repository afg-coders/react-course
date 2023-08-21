import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRequest, getRequest, postRequest } from '../utils/http';

export const getUsers = async (page, limit) => {
  return getRequest(`user`, { page, per_page: limit });
};

export const getUser = async (id) => {
  return getRequest(`user/${id}`);
};

export const createUser = async (params) => {
  return postRequest('user', params);
};

export const deleteUser = async (ids) => {
  await deleteRequest(`user`, {
    params: {
      ids,
    },
  });
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
    mutationFn: (params) => createUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'fetch-users' });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteUser(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'fetch-users' });
    },
  });
};
