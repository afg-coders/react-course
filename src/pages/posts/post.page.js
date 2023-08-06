import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core';

import React from 'react';
import { useThemeStore } from '../../store/theme.store';
import { IconLogout2, IconMoon2, IconSun } from '@tabler/icons-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useCreateUser, useGetUsers } from '../../queries/users.query';
import { useForm } from '@mantine/form';

function PostsPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { logout } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isLoading: createLoading } = useCreateUser();
  const form = useForm({
    initialValues: {
      name: '',
      job: '',
    },
  });

  const { theme, setTheme } = useThemeStore();
  const { data, isLoading, isError } = useGetUsers(
    searchParams.get('page') || 1,
    searchParams.get('limit') || 10
  );

  const updateQueryParams = (newParams) => {
    const mergedParams = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(mergedParams);
  };

  const onCreate = (values) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        close();
      },
    });
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
    <Container size={'xl'}>
      <Group position="apart" mb={'lg'} mt={'md'}>
        <Text size={'xl'} variant="gradient">
          Posts
        </Text>
        <Flex>
          {theme === 'light' ? (
            <IconMoon2 onClick={() => setTheme('dark')} />
          ) : (
            <IconSun onClick={() => setTheme('light')} />
          )}
          <ActionIcon ml={20} onClick={logout}>
            <IconLogout2 />
          </ActionIcon>
        </Flex>
      </Group>
      <Group position="apart" mb={'xl'}>
        <Select
          placeholder="10"
          onChange={(value) => updateQueryParams({ limit: value })}
          data={[{ value: 10 }, { value: 20 }, { value: 30 }, { value: 50 }]}
        />
        <Button onClick={open}>Insert</Button>
      </Group>
      <Modal centered opened={opened} onClose={close} title="Create User">
        <form onSubmit={form.onSubmit((value) => onCreate(value))}>
          <Group mt="md">
            <TextInput {...form.getInputProps('name')} label="Name" required />
            <TextInput {...form.getInputProps('job')} label="Job" required />
          </Group>

          <Group mt="xl">
            <Button loading={createLoading} type="submit" variant="outline">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <Table striped withBorder>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Lastname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((value) => {
            return (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.email}</td>
                <td>{value.first_name}</td>
                <td>{value.last_name}</td>
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
          total={Math.ceil(data?.total / (+searchParams.get('limit') || 10))}
        />
      </Center>
    </Container>
  );
}

export default PostsPage;
