import {
  Alert,
  Card,
  Center,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
} from '@mantine/core';

import React from 'react';
import { getTodo } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { useThemeStore } from '../../store/theme.store';
import { IconMoon2, IconSun } from '@tabler/icons-react';
import { Link, useSearchParams } from 'react-router-dom';

function PostsPage() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { theme, setTheme } = useThemeStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'fetch-todo',
      searchParams.get('page') || 1,
      searchParams.get('limit') || 10,
    ],
    queryFn: () =>
      getTodo(searchParams.get('page') || 1, searchParams.get('limit') || 10),
  });

  const updateQueryParams = (newParams) => {
    const mergedParams = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(mergedParams);
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return (
      <Card>
        <Alert>Error Occurred</Alert>
      </Card>
    );
  }

  return (
    <div>
      <Group position="apart" mb={'lg'} mt={'md'}>
        <Text size={'xl'} variant="gradient">
          Posts
        </Text>
        {theme === 'light' ? (
          <IconMoon2 onClick={() => setTheme('dark')} />
        ) : (
          <IconSun onClick={() => setTheme('light')} />
        )}
      </Group>
      <Select
        label="Per page"
        placeholder="10"
        value={searchParams.get('limit') || 10}
        onChange={(value) => updateQueryParams({ limit: value })}
        data={[{ value: 10 }, { value: 20 }, { value: 30 }, { value: 50 }]}
      />
      <Table striped withBorder>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((value) => {
            return (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.title}</td>
                <td>
                  <Link to={`/post/${value.id}`}>More</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Center mt={'lg'}>
        <Pagination
          onChange={(value) => updateQueryParams({ page: value })}
          value={+searchParams.get('page') || 1}
          total={100 / (+searchParams.get('limit') || 10)}
        />
      </Center>
    </div>
  );
}

export default PostsPage;
