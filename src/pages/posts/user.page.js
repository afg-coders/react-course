import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';

import React, { useState } from 'react';
import { useThemeStore } from '../../store/theme.store';
import {
  IconLogout2,
  IconMoon2,
  IconSun,
  IconTrash,
} from '@tabler/icons-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import {
  useCreateUser,
  useDeleteUser,
  useGetUsers,
} from '../../queries/users.query';
import { useForm } from '@mantine/form';
function UsersPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { logout } = useAuthStore();
  const { classes, cx } = useStyles();
  const [userId, setUserId] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const { mutate, isLoading: createLoading } = useCreateUser();
  const form = useForm({
    initialValues: {
      name: '',
      job: '',
    },
  });
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteUser();
  const [selection, setSelection] = useState([]);
  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const { theme, setTheme } = useThemeStore();
  const { data, isLoading, isError } = useGetUsers(
    searchParams.get('page') || 1,
    searchParams.get('limit') || 10
  );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data?.data?.length
        ? []
        : data?.data.map((item) => item.id)
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

  const onDelete = async (id) => {
    deleteMutate(
      { id },
      {
        onSuccess: () => {
          deleteClose();
          setUserId();
        },
      }
    );
  };

  const deleteUsers = () => {
    deleteMutate(
      { ids: selection },
      {
        onSuccess: () => {
          console.log('success');
        },
      }
    );
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
  console.log(searchParams.get('limit'));

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
          placeholder={searchParams.get('limit') || '20'}
          value={searchParams.get('limit') || '20'}
          onChange={(value) => updateQueryParams({ limit: value })}
          data={[
            { value: '10' },
            { value: '20' },
            { value: '30' },
            { value: '50' },
          ]}
        />
        <Flex>
          {selection.length > 0 ? (
            <Button onClick={deleteUsers}>Delete</Button>
          ) : (
            ''
          )}
          <Button onClick={open}>Insert</Button>
        </Flex>
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
      <Modal opened={deleteOpened} onClose={deleteClose} title="Delete User">
        <Center>
          <Group mt="xl">
            <Button
              loading={deleteLoading}
              onClick={() => {
                onDelete(userId);
              }}
              type="submit"
              variant="outline"
            >
              Delete
            </Button>
          </Group>
        </Center>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((value) => {
            const selected = selection.includes(value.id);

            return (
              <tr
                key={value.id}
                className={cx({ [classes.rowSelected]: selected })}
              >
                <td>
                  <Checkbox
                    checked={selection.includes(value.id)}
                    onChange={() => toggleRow(value.id)}
                    transitionDuration={0}
                  />
                </td>
                <td>{value.id}</td>
                <td>{value.email}</td>
                <td>{value.name}</td>
                <td>{value.role}</td>
                <td>
                  <Flex>
                    <Link to={`/post/${value.id}`}>More</Link>

                    <ActionIcon
                      ml={10}
                      onClick={() => {
                        setUserId(value.id);
                        deleteOpen();
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Flex>
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
          total={Math.ceil(
            data?.totalCount / (+searchParams.get('limit') || 10)
          )}
        />
      </Center>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));
export default UsersPage;
